package com.role.net.dto.User;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(
    @NotEmpty(message = "Username required") String username,
    @NotEmpty(message = "Password required") String password
) {}
