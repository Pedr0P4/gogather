package com.role.net.RoleNet.dto.Group;

import java.time.LocalDateTime;
import java.util.UUID;

public record CreateGroupResponse(
    UUID externalId,
    String name,
    String description,
    String inviteCode,
    LocalDateTime createdAt
) {}
