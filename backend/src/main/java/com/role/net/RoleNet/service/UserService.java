package com.role.net.RoleNet.service;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.exception.DataDoesntMatchException;
import com.role.net.RoleNet.exception.ResourceNotFoundException;
import com.role.net.RoleNet.exception.UniqueDataAlreadyInUseException;
import com.role.net.RoleNet.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.encoder = passwordEncoder;
    }

    private User findById(String id) {
        UUID uuid = UUID.fromString(id);
        User user = this.userRepository.findByExternalId(uuid)
            .orElseThrow(() -> new ResourceNotFoundException("User id " + uuid + " not found."));
        return user;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User " + username + " nor found."));
    }

    @Transactional
    public User update(
        String id,
        String username,
        String displayName,
        String email,
        String password,
        String newPassword,
        LocalDate birthDate
    ) {
        User user = this.findById(id);

        if(!this.encoder.matches(password, user.getPassword()))
            throw new DataDoesntMatchException("A senha está incorreta.");

        if(newPassword != null && !newPassword.isBlank())
            user.setPassword(this.encoder.encode(newPassword));

        if(username != null && !username.isBlank() && !username.equals(user.getUsername())){
            if(this.userRepository.existsByUsername(username))
                throw new UniqueDataAlreadyInUseException("Username " + username + " already in use.");
            user.setUsername(username);
        }

        if(email != null && !email.isBlank() && !email.equals(user.getEmail())){
            if(this.userRepository.existsByEmail(email))
                throw new UniqueDataAlreadyInUseException("Email " + email + " already in use.");
            user.setEmail(email);
        }

        if(displayName != null && !displayName.isBlank())
            user.setDisplayName(displayName);

        if(birthDate != null)
            user.setBirthDate(birthDate);

        return user;
    }

    @Transactional
    public void delete(String id) {
        User userToDelete = this.findById(id);
        this.userRepository.delete(userToDelete);
    }

}
