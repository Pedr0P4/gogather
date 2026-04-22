package com.role.net.RoleNet.dto.friendship;

import java.util.UUID;

import com.role.net.RoleNet.entity.Friendship;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.enums.FriendshipStatus;

public record FriendshipSimpleResponse(
    UUID fsExternalId,
    UUID friendExternalId,
    String friendUsername,
    String friendDisplayName,
    FriendshipStatus status
) {
    public static FriendshipSimpleResponse from(User user, Friendship fs) {
        return new FriendshipSimpleResponse(
            fs.getExternalId(),
            user.getExternalId(),
            user.getUsername(),
            user.getDisplayName(),
            fs.getStatus()
        );
    }
}
