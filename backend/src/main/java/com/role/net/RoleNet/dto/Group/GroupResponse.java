package com.role.net.RoleNet.dto.group;

import java.time.Instant;
import java.util.UUID;

public record GroupResponse(
    UUID externalId,
    String name,
    String description,
    String inviteCode,
  	Instant eventDate
) {}
