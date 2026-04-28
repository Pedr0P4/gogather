package com.role.net.RoleNet.dto.expense;

import java.util.UUID;

import com.role.net.RoleNet.entity.GroupMember;

public record ExpenseDistributionPixResponse(
    UUID receiverMemberExternalId,
    String receiverMerchantName,
    String pixCopyAndPaste
) {
    public static ExpenseDistributionPixResponse from(GroupMember groupMember, String pixcnp) {
        return new ExpenseDistributionPixResponse(
            groupMember.getExternalId(),
            groupMember.getUser().getPixInfo().getMerchantName(),
            pixcnp
        );
    }
}
