package com.role.net.RoleNet.dto.friendship;

import java.time.LocalDate;
import java.util.UUID;

import com.role.net.RoleNet.entity.Friendship;
import com.role.net.RoleNet.enums.FriendshipStatus;

public record FriendshipResponse(
    UUID fsExternalId,
    UUID requesterExternalId,
    UUID receiverExternalId,
    String requesterUsername,
    String receiverUsername,
    LocalDate friendshipDate,
    FriendshipStatus status
) {
    public static FriendshipResponse from(Friendship friendship) {
        return new FriendshipResponse(
            friendship.getExternalId(),
            friendship.getRequester().getExternalId(),
            friendship.getReceiver().getExternalId(),
            friendship.getRequester().getUsername(),
            friendship.getReceiver().getUsername(),
            friendship.getFriendshipDate(),
            friendship.getStatus());
    }
}
