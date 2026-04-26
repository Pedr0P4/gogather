package com.role.net.RoleNet.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.role.net.RoleNet.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByExternalId(UUID externalId);
}
