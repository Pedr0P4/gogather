package com.role.net.RoleNet.service;

import com.role.net.RoleNet.dto.chat.AiMentionEvent;
import com.role.net.RoleNet.dto.chat.ChatMessageResponse;
import com.role.net.RoleNet.entity.ChatMessage;
import com.role.net.RoleNet.entity.Group;
import com.role.net.RoleNet.enums.MessageType;
import com.role.net.RoleNet.exception.ResourceNotFoundException;
import com.role.net.RoleNet.repository.ChatMessageRepository;
import com.role.net.RoleNet.repository.GroupRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.ai.converter.BeanOutputConverter;
import com.role.net.RoleNet.entity.Poll;
import com.role.net.RoleNet.entity.PollOption;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class AiService {

    public record PollOptionData(String text, String placeId) {}
    public record AiResponseData(String message, List<PollOptionData> pollOptions) {}

    private final ChatClient chatClient;
    private final GroupRepository groupRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public AiService(
            ChatClient.Builder chatClientBuilder,
            GroupRepository groupRepository,
            ChatMessageRepository chatMessageRepository,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.groupRepository = groupRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.messagingTemplate = messagingTemplate;
        
        this.chatClient = chatClientBuilder
                .defaultAdvisors(new MessageChatMemoryAdvisor(new InMemoryChatMemory())) //le as ultimas mensagens para manter o contexto da conversa
                .build();
    }
    @Async
    @EventListener
    @Transactional
    public void handleAiMention(AiMentionEvent event) {
        Long groupId = event.groupId();

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Grupo não encontrado"));

        String stopsContext = group.getEventStops().stream()
                .map(stop -> stop.getName() + " (" + stop.getCategory() + ")")
                .collect(Collectors.joining(", "));

        String systemPrompt = String.format("""
            Você é a IA assistente oficial do GoGather, um aplicativo web de organização de saídas (rolês) com os amigos.
            Você é uma organizadora de eventos animada, descolada e útil e de simples linguagem, pronta para ajudar os usuários a planejar e aproveitar ao máximo seus rolês.
            Aqui estão os detalhes do rolê que você está ajudando a organizar:
            - Nome do Rolê: %s
            - Descrição: %s
            - Data: %s
            - Paradas/Roteiro: %s
            Ajude os usuários com dúvidas sobre o roteiro, dê sugestões de como é o lugar que eles visitarão, e dê ideias de lugares legais parecidos com o que eles querem.
            Responda de forma concisa e amigável.
            """, 
            group.getName(), 
            group.getDescription(), 
            group.getEventDate().toString(), 
            stopsContext.isEmpty() ? "Ainda não definido" : stopsContext
        );

        BeanOutputConverter<AiResponseData> converter = new BeanOutputConverter<>(AiResponseData.class);
        
        String finalSystemPrompt = systemPrompt + "\n\n{format}";

        //to usando o groupId.toString() como a chave da memória(conversationId) para isolar o histórico por rolê
        String aiResponseText = this.chatClient.prompt()
                .system(s -> s.text(finalSystemPrompt).param("format", converter.getFormat()))
                .user(event.content())
                .advisors(a -> a.param(MessageChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY, groupId.toString()))
                // registrando a ferramenta de busca de locais que criei em AiToolsConfig, depois das alterações propostas por Hennrique
                .functions("searchPlacesTool")
                .call()
                .content();

        AiResponseData data = converter.convert(aiResponseText);

        ChatMessage aiMessage = ChatMessage.builder()
                .group(group)
                .sender(null)// o sender pode ser null oq a IA não tem um user associado
                .content(data.message())
                .type(MessageType.AI)
                .build();

        if (data.pollOptions() != null && !data.pollOptions().isEmpty()) {
            Poll poll = Poll.builder()
                .chatMessage(aiMessage)
                .build();
            
            List<PollOption> options = data.pollOptions().stream().map(opt -> PollOption.builder()
                .poll(poll)
                .text(opt.text())
                .placeId(opt.placeId())
                .votes(0)
                .build())
            .toList();
            
            poll.setOptions(options);
            aiMessage.setPoll(poll);
        }

        ChatMessage savedAiMessage = chatMessageRepository.save(aiMessage);
        ChatMessageResponse responsePayload = ChatMessageResponse.from(savedAiMessage);
        
        messagingTemplate.convertAndSend("/topic/group/" + group.getExternalId(), responsePayload);
    }
}