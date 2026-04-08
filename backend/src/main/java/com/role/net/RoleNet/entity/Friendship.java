package com.role.net.RoleNet.entity;

import java.time.LocalDate;

import com.role.net.RoleNet.enums.FriendshipStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@SequenceGenerator(name = "id_generator", sequenceName = "seq_friendship", allocationSize = 1)
@Table(name = "friendships")
@Builder
public class Friendship extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(name = "friendship_date", nullable = true)
    private LocalDate friendshipDate;

    @NotNull(message = "Friendship status cannot be null!")
    @Column(name = "status", nullable = false)
    private FriendshipStatus status;

}
