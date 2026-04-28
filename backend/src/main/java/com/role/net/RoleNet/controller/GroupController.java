package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.entity.Expense;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.service.ExpenseService;
import com.role.net.RoleNet.service.GroupService;
import com.role.net.RoleNet.config.JWTUserData;
import com.role.net.RoleNet.dto.expense.ExpenseAutoCreationRequest;
import com.role.net.RoleNet.dto.expense.ExpenseManualCreationRequest;
import com.role.net.RoleNet.dto.expense.ExpenseResponse;
import com.role.net.RoleNet.dto.group.CreateGroupRequest;
import com.role.net.RoleNet.dto.group.GroupDetailsResponse;
import com.role.net.RoleNet.dto.group.GroupResponse;

import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final ExpenseService expenseService;

    public GroupController(
        GroupService groupService,
        ExpenseService expenseService
    ) {
        this.groupService = groupService;
        this.expenseService = expenseService;
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
    public ResponseEntity<List<GroupResponse>> getUserGroups(@AuthenticationPrincipal User user) {
        List<GroupResponse> response = groupService.getUserGroups(user.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{externalId}")
    public ResponseEntity<GroupDetailsResponse> getGroupDetails(
            @PathVariable UUID externalId,
            @AuthenticationPrincipal User user
    ) {
        GroupDetailsResponse response = groupService.getGroupDetails(externalId, user.getId());

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

    @PostMapping("/{groupId}/expense/auto")
    public ResponseEntity<ExpenseResponse> createExpenseAuto(
        @AuthenticationPrincipal User user,
        @PathVariable UUID groupId,
        @RequestBody ExpenseAutoCreationRequest request
    ) {
        Expense expense = expenseService.createAuto(user, groupId, request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ExpenseResponse.from(expense));
    }

    @PostMapping("/{groupId}/expense/manual")
    public ResponseEntity<ExpenseResponse> createExpenseManual(
        @AuthenticationPrincipal User user,
        @PathVariable UUID groupId,
        @RequestBody ExpenseManualCreationRequest request
    ) {
        Expense expense = expenseService.createManual(user, groupId, request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ExpenseResponse.from(expense));
    }
}
