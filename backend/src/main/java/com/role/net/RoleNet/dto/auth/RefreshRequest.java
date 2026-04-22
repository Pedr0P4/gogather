package com.role.net.RoleNet.dto.auth;

import jakarta.validation.constraints.NotEmpty;

public record RefreshRequest(@NotEmpty(message = "RefreshToken required") String refreshToken) {
}
