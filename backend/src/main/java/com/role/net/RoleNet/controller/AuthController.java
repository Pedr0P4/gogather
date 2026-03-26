package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.config.TokenConfig;
import com.role.net.RoleNet.dto.User.LoginRequest;
import com.role.net.RoleNet.dto.User.LoginResponse;
import com.role.net.RoleNet.dto.User.RegisterUserRequest;
import com.role.net.RoleNet.dto.User.RegisterUserResponse;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder encoder,
            AuthenticationManager authenticationManager,
            TokenConfig tokenConfig
    ) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
        @Valid @RequestBody LoginRequest request
    ) {

        UsernamePasswordAuthenticationToken userAndPass = new UsernamePasswordAuthenticationToken(request.username(), request.password());
        Authentication authentication = authenticationManager.authenticate(userAndPass);

        User user = (User) authentication.getPrincipal();
        String token = tokenConfig.generateToken(user);

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(
        @Valid @RequestBody RegisterUserRequest request
    ) {
        User newUser = new User();
        newUser.setUsername(request.username());
        newUser.setEmail(request.email());
        newUser.setPassword(encoder.encode(request.password()));
        newUser.setBirthDate(request.birthDate());

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            new RegisterUserResponse(newUser.getUsername(), newUser.getEmail())
        );
    }
}
