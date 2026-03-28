package com.role.net.RoleNet.dto.User;

import java.time.LocalDate;

import com.role.net.RoleNet.entity.User;

public record UserResponse(
    String id,
    String username,
    String displayName,
    String email,
    LocalDate birthDate
) {
    public static UserResponse from(User user) {
        return new UserResponse(
            user.getExternalId().toString(),
            user.getUsername(),
            user.getDisplayName(),
            user.getEmail(),
            user.getBirthDate());
    }
}
