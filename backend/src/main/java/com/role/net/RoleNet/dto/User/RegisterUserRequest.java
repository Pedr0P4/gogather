package com.role.net.RoleNet.dto.User;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RegisterUserRequest(
    @NotEmpty(message = "Username required") String username,
    @Email @NotEmpty(message = "E-mail required") String email,
    @NotEmpty(message = "Password required") String password,
    @NotNull(message = "Birth date required") LocalDate birthDate
) {}
