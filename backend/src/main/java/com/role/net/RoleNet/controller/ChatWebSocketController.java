package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.dto.chat.ChatMessageRequest;
import com.role.net.RoleNet.dto.chat.ChatMessageResponse;
import com.role.net.RoleNet.dto.chat.TypingEvent;
import com.role.net.RoleNet.entity.ChatMessage;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.service.ChatService;
import jakarta.validation.Valid;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    private final ChatService chatService;

    public ChatWebSocketController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat/{groupId}/send")
    @SendTo("/topic/group/{groupId}")
    public ChatMessageResponse sendMessage(
            @DestinationVariable Long groupId,
            @Payload @Valid ChatMessageRequest request,
            @AuthenticationPrincipal User user
    ) {
        Long userId = user.getId();
        ChatMessage savedMessage = chatService.saveMessage(groupId, userId, request);

        return ChatMessageResponse.from(savedMessage);
    }

	@MessageMapping("/chat/{groupId}/typing")
    @SendTo("/topic/group/{groupId}/typing")
    public TypingEvent handleTyping(
            @DestinationVariable Long groupId,
            @Payload TypingEvent request,
            @AuthenticationPrincipal User user
    ) {
        return new TypingEvent(user.getUsername(), request.isTyping());
    }
}
