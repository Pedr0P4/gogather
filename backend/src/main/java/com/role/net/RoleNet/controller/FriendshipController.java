package com.role.net.RoleNet.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.role.net.RoleNet.dto.Friendship.FriendshipResponse;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.service.FriendshipService;

@RestController
@RequestMapping("/friendship")
public class FriendshipController {

    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @GetMapping("/{fsId}")
    public ResponseEntity<FriendshipResponse> requestDetails(
        @AuthenticationPrincipal User user,
        @PathVariable UUID fsId
    ) {
        FriendshipResponse friendshipResponse = friendshipService
            .details(user.getId(), fsId);
        return ResponseEntity.ok(friendshipResponse);
    }

    @PostMapping("/send/{recId}")
    public ResponseEntity<FriendshipResponse> sendRequest(
        @AuthenticationPrincipal User user,
        @PathVariable UUID recId
    ) {
        FriendshipResponse friendshipResponse = friendshipService
            .send(user.getId(), recId);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(friendshipResponse);
    }

    @PatchMapping("/accept/{fsId}")
	public ResponseEntity<FriendshipResponse> acceptRequest(
	    @AuthenticationPrincipal User user,
		@PathVariable UUID fsId
	) {
        FriendshipResponse friendshipResponse = friendshipService
            .accept(user.getId(), fsId);
        return ResponseEntity.ok(friendshipResponse);
	}

	@PatchMapping("/refuse/{fsId}")
	public ResponseEntity<FriendshipResponse> refuseRequest(
	    @AuthenticationPrincipal User user,
		@PathVariable UUID fsId
	) {
        FriendshipResponse friendshipResponse = friendshipService
            .refuse(user.getId(), fsId);
        return ResponseEntity.ok(friendshipResponse);
	}
}
