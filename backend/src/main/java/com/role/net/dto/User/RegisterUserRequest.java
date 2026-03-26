package com.role.net.dto.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record RegisterUserRequest(
    @NotEmpty(message = "Username required") String username,
    @Email @NotEmpty(message = "E-mail required") String email,
    @NotEmpty(message = "Password required") String password
) {}
