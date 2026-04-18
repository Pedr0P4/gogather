package com.role.net.RoleNet.dto.User;

import com.role.net.RoleNet.entity.User;

public record UserSearchResponse(
    String externalId,
    String username,
    String displayName
) {
    public static UserSearchResponse from(User user) {
        return new UserSearchResponse(
            user.getExternalId().toString(),
            user.getUsername(),
            user.getDisplayName());
    }
}
