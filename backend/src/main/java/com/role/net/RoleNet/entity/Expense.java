package com.role.net.RoleNet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SequenceGenerator(
    name = "id_generator",
    sequenceName = "seq_expense",
    allocationSize = 1
)
@Table(name = "expense")
@Builder
public class Expense extends BaseEntity {

    @Column(nullable = true)
    private String description;

    @NotNull(message = "Expense total value cannot be null!")
    @Column(nullable = false)
    private Double totalValue;

    @NotNull(message = "The expense must be payed by someone!")
    @ManyToOne
    @JoinColumn(name = "who_payed_id", nullable = false)
    private User whoPayed;

    @NotNull(message = "The expense must have a group!")
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = true)
    private Group group;
}
