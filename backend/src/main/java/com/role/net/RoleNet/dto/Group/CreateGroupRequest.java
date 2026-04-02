package com.role.net.RoleNet.dto.Group;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateGroupRequest(
	@NotBlank(message = "Group name is required")
	@Size(min = 1, max = 255, message = "Group name must be between 1 and 255 characters")
	String name, 

	@Size(max = 500, message = "Group description must be at most 500 characters")
	String description
) {}