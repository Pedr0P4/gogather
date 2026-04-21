package com.role.net.RoleNet.dto.error;

import java.time.Instant;

public record StandardErrorDTO(
    Instant timestamp,
    Integer status,
    String error,
    String message,
    String path
) {}
