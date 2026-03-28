package com.role.net.RoleNet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.role.net.RoleNet.dto.User.UpdateUserRequest;
import com.role.net.RoleNet.dto.User.UpdateUserResponse;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<UpdateUserResponse> updateUser(
        @PathVariable String id,
        @Valid @RequestBody UpdateUserRequest request
    ) {
        User user = this.userService.update(
            id,
            request.username(),
            request.displayName(),
            request.email(),
            request.password(),
            request.newPassword(),
            request.birthDate()
        );

        return ResponseEntity.ok(UpdateUserResponse.from(user));
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(
        @PathVariable String id
    ) {
        this.userService.delete(id);
        return ResponseEntity.ok().build();
    }
}
