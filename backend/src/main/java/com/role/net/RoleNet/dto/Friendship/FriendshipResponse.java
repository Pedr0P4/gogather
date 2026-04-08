package com.role.net.RoleNet.dto.Friendship;

import java.time.LocalDate;
import java.util.UUID;

import com.role.net.RoleNet.entity.Friendship;
import com.role.net.RoleNet.enums.FriendshipStatus;

public record FriendshipResponse(
    UUID requesterExternalId,
    UUID receiverExternalId,
    LocalDate friendshipDate,
    FriendshipStatus status
) {
    public static FriendshipResponse from(Friendship friendship) {
        return new FriendshipResponse(
            friendship.getRequester().getExternalId(),
            friendship.getReceiver().getExternalId(),
            friendship.getFriendshipDate(),
            friendship.getStatus());
    }
}
