package com.role.net.RoleNet.dto.Auth;

import jakarta.validation.constraints.NotEmpty;

public record RefreshRequest(@NotEmpty(message = "RefreshToken required") String refreshToken) {
}
