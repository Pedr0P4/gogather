package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.dto.Group.CreateGroupRequest;
import com.role.net.RoleNet.dto.Group.CreateGroupResponse;
import com.role.net.RoleNet.service.GroupService;
import com.role.net.RoleNet.config.JWTUserData; 
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public ResponseEntity<CreateGroupResponse> createGroup(
            @Valid @RequestBody CreateGroupRequest request,
            Authentication authentication
	) {
        
        JWTUserData userData = (JWTUserData) authentication.getPrincipal();
        CreateGroupResponse response = groupService.create(request, userData.userId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}