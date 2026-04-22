package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.dto.Group.CreateGroupRequest;
import com.role.net.RoleNet.dto.Group.GroupDetailsResponse;
import com.role.net.RoleNet.dto.Group.GroupResponse;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.service.GroupService;
import com.role.net.RoleNet.config.JWTUserData; 
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<GroupResponse> createGroup(
            @Valid @RequestBody CreateGroupRequest request,
            @AuthenticationPrincipal User user
	) {
        
        GroupResponse response = groupService.create(request, user.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

	@GetMapping
    public ResponseEntity<List<GroupResponse>> getUserGroups(Authentication authentication) {
        JWTUserData userData = (JWTUserData) authentication.getPrincipal();
        List<GroupResponse> response = groupService.getUserGroups(userData.userId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{externalId}")
    public ResponseEntity<GroupDetailsResponse> getGroupDetails(
            @PathVariable UUID externalId,
            Authentication authentication) {
        
        JWTUserData userData = (JWTUserData) authentication.getPrincipal();
        GroupDetailsResponse response = groupService.getGroupDetails(externalId, userData.userId());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/join/{inviteCode}")
    public ResponseEntity<Void> joinGroup(
            @PathVariable String inviteCode,
            @AuthenticationPrincipal User loggedInUser
    ) {
        groupService.joinGroupByInviteCode(inviteCode, loggedInUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{groupId}/invite/{friendId}")
    public ResponseEntity<Void> inviteFriend(
            @PathVariable UUID groupId,
            @PathVariable UUID friendId,
            @AuthenticationPrincipal User loggedInUser
    ) {
        groupService.inviteFriendToGroup(groupId, friendId, loggedInUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{groupId}/accept")
    public ResponseEntity<Void> acceptInvite(
            @PathVariable UUID groupId,
            @AuthenticationPrincipal User loggedInUser
    ) {
        groupService.acceptGroupInvite(groupId, loggedInUser);
        return ResponseEntity.ok().build();
    }
}