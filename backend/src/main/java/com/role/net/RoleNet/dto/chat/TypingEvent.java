package com.role.net.RoleNet.dto.chat;

public record TypingEvent(
    String senderName,
    boolean isTyping
) {}