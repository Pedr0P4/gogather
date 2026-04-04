package com.role.net.RoleNet.dto.Group;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.role.net.RoleNet.entity.GroupRole;

public record GroupDetailsResponse(
    UUID externalId,
    String name,
    String description,
    String inviteCode,
    LocalDateTime createdAt,
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