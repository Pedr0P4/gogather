package com.role.net.RoleNet.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.role.net.RoleNet.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<UserDetails> findUserByUsername(String username);

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByExternalId(UUID externalId);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
