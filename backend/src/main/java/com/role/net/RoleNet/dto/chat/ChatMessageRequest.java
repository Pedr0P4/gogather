package com.role.net.RoleNet.dto.chat;

import jakarta.validation.constraints.NotBlank;

public record ChatMessageRequest(
    @NotBlank(message = "A mensagem não pode ser vazia")
    String content
) {}