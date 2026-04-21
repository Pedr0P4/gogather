package com.role.net.RoleNet.dto.chat;

public record AiMentionEvent(
    Long groupId, 
    String content
) {}