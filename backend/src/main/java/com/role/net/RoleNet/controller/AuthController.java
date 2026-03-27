package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.dto.User.LoginRequest;
import com.role.net.RoleNet.dto.User.TokenResponse;
import com.role.net.RoleNet.dto.User.RefreshRequest;
import com.role.net.RoleNet.dto.User.RegisterUserRequest;
import com.role.net.RoleNet.dto.User.RegisterUserResponse;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.service.AuthService;
import com.role.net.RoleNet.service.TokenService;

import jakarta.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final TokenService tokenService;

    public AuthController(
            AuthenticationManager authenticationManager,
            AuthService authService,
            TokenService tokenService
    ) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
        @Valid @RequestBody LoginRequest request
    ) {

        UsernamePasswordAuthenticationToken userAndPass = new UsernamePasswordAuthenticationToken(request.username(), request.password());
        Authentication authentication = authenticationManager.authenticate(userAndPass);
        User user = (User) authentication.getPrincipal();

        String accessToken = tokenService.generateAccessToken(user);
        String refreshToken = tokenService.generateRefreshToken(user);

        ResponseCookie jwtCookie = tokenService.generateAccessTokenCookie(accessToken);
        ResponseCookie refreshCookie = tokenService.generateRefreshTokenCookie(refreshToken);

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
            .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
            .body("Login efetuado com sucesso!");
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(
        @Valid @RequestBody RegisterUserRequest request
    ) {
        User newUser = authService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            new RegisterUserResponse(newUser.getUsername(), newUser.getEmail())
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refresh(@Valid @RequestBody RefreshRequest refreshRequest) {
        TokenResponse tokenResponse = tokenService.updateTokens(refreshRequest.refreshToken());

        ResponseCookie jwtCookie = tokenService.generateAccessTokenCookie(tokenResponse.accessToken());
        ResponseCookie refreshCookie = tokenService.generateRefreshTokenCookie(tokenResponse.refreshToken());

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
            .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
            .body("Refresh feito!");
    }
}
