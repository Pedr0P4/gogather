package com.role.net.RoleNet.service;

import com.role.net.RoleNet.entity.ChatMessage;
import com.role.net.RoleNet.entity.Group;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.enums.MessageType;
import com.role.net.RoleNet.dto.chat.AiMentionEvent;
import com.role.net.RoleNet.dto.chat.ChatMessageResponse;
import com.role.net.RoleNet.repository.ChatMessageRepository;
import com.role.net.RoleNet.repository.GroupRepository;
import com.role.net.RoleNet.repository.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    public ChatService(
            ChatMessageRepository chatMessageRepository,
            GroupRepository groupRepository,
            UserRepository userRepository,
            ApplicationEventPublisher eventPublisher
    ) {
        this.chatMessageRepository = chatMessageRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public ChatMessage saveMessage(Long groupId, Long userId, String content) {
        
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
                
        User sender = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

		ChatMessage message = ChatMessage.builder()
				.group(group)
				.sender(sender)
				.content(content)
				.type(MessageType.USER)
				.build();

        ChatMessage savedMessage = chatMessageRepository.save(message);

		// precisa rever se isso daqui faz sentido.
		// depois vemos uma forma melhor de identificar menções para a IA
        if (content.trim().toUpperCase().contains("@IA")) {
            eventPublisher.publishEvent(new AiMentionEvent(groupId, content));
        }

        return savedMessage;
    }

	@Transactional(readOnly = true)
	public Page<ChatMessageResponse> getMessagesByGroup(Long groupId, Pageable pageable) {
		if (!groupRepository.existsById(groupId)) {
			throw new RuntimeException("Grupo não encontrado");
		}

		return chatMessageRepository.findByGroupIdOrderByCreatedAtDesc(groupId, pageable)
				.map(ChatMessageResponse::from);
	}
}