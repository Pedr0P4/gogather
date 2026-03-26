package com.role.net.controller;

import com.role.net.dto.User.LoginRequest;
import com.role.net.dto.User.LoginResponse;
import com.role.net.dto.User.RegisterUserRequest;
import com.role.net.dto.User.RegisterUserResponse;
import com.role.net.entity.User;
import com.role.net.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
        @Valid @RequestBody LoginRequest request
    ) {
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(
        @Valid @RequestBody RegisterUserRequest request
    ) {
        User newUser = new User();
        newUser.setUsername(request.username());
        newUser.setEmail(request.email());
        newUser.setPassword(request.password());

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            new RegisterUserResponse(newUser.getUsername(), newUser.getEmail())
        );
    }
}
