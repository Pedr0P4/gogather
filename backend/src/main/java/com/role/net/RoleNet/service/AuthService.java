package com.role.net.RoleNet.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.role.net.RoleNet.dto.User.LoginRequest;
import com.role.net.RoleNet.dto.User.RegisterUserRequest;
import com.role.net.RoleNet.dto.User.TokenResponse;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.repository.UserRepository;

@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.encoder = passwordEncoder;
    }

    public User registerUser(RegisterUserRequest registerUserRequest) {
        User newUser = new User();
        newUser.setUsername(registerUserRequest.username());
        newUser.setEmail(registerUserRequest.email());
        newUser.setPassword(encoder.encode(registerUserRequest.password()));
        newUser.setBirthDate(registerUserRequest.birthDate());
        userRepository.save(newUser);

        return newUser;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }

}
