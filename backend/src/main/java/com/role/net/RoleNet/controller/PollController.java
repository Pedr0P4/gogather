package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.service.PollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.role.net.RoleNet.entity.User;

@RestController
@RequestMapping("/groups/{externalId}/polls")
public class PollController {

    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping("/options/{optionId}/vote")
    public ResponseEntity<Void> vote(
            @PathVariable UUID externalId,
            @PathVariable Long optionId,
            @AuthenticationPrincipal User user
    ) {
        pollService.vote(optionId, externalId, user);
        return ResponseEntity.ok().build();
    }
}
