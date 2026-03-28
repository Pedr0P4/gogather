package com.role.net.RoleNet.entity;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "event_groups")
public class Group extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<GroupMember> members = new HashSet<>();

    @Column(name = "invite_code", unique = true, updatable = false, nullable = false)
    private String inviteCode;

    @PrePersist
    public void generateInviteCode() {
        if (this.inviteCode == null || this.inviteCode.isEmpty()) {
            this.inviteCode = UUID.randomUUID()
                .toString()
                .toUpperCase()
                .replaceAll("-", "")
                .substring(0, 8);
        }
    }
}
