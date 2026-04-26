package com.role.net.RoleNet.dto.expense;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record ExpenseContributionRequest(
    @NotNull(message = "Expense contribution value is missing.") Double value,
    @NotNull(message = "Expense contribution payer id is missing.") UUID payerExternalId
) {
}
