package com.role.net.RoleNet.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.role.net.RoleNet.entity.ExpenseContribution;

public interface ExpenseContributionRepository extends JpaRepository<ExpenseContribution, Long> {
    Optional<ExpenseContribution> findByExternalId(UUID externalId);
}
