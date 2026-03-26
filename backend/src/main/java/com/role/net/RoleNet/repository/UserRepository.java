package com.role.net.RoleNet.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.role.net.RoleNet.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<UserDetails> findUserByUsername(String username);
}
