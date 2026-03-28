package com.role.net.RoleNet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.role.net.RoleNet.entity.RefreshToken;
import com.role.net.RoleNet.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUser(User user);
}
