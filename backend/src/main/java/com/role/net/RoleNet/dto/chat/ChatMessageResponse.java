package com.role.net.RoleNet.dto.chat;

import com.role.net.RoleNet.entity.ChatMessage;
import com.role.net.RoleNet.enums.MessageType;
import java.time.Instant;

public record ChatMessageResponse(
    String content,
    String senderName,
    MessageType type,
    Instant createdAt
) {
    public static ChatMessageResponse from(ChatMessage message) {
        String senderName = message.getType() == MessageType.USER && message.getSender() != null 
                            ? message.getSender().getDisplayName() 
                            : "GoGather IA";

        return new ChatMessageResponse(
            message.getContent(),
            senderName,
            message.getType(),
            message.getCreatedAt()
        );
    }
}