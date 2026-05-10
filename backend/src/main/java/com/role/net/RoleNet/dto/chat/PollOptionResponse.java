package com.role.net.RoleNet.dto.chat;

import com.role.net.RoleNet.entity.PollOption;

public record PollOptionResponse(
    Long id,
    String text,
    String placeId,
    int votes
) {
    public static PollOptionResponse from(PollOption option) {
        return new PollOptionResponse(
            option.getId(),
            option.getText(),
            option.getPlaceId(),
            option.getVotes()
        );
    }
}
