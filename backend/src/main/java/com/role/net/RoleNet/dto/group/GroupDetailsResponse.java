package com.role.net.RoleNet.dto.group;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.role.net.RoleNet.enums.GroupRole;

public record GroupDetailsResponse(
    UUID externalId,
    String name,
    String description,
    String inviteCode,
    Instant createdAt,
    Instant eventDate,
    List<MemberDTO> members
) {
    public record MemberDTO(
		UUID externalId,
		String username,
		String displayName,
		GroupRole role,
		String email
	) {}
}
