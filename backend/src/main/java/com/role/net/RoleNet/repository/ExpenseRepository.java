package com.role.net.RoleNet.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.role.net.RoleNet.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByExternalId(UUID externalId);
    List<Expense> findByGroup_ExternalId(UUID groupExternalId);
}
