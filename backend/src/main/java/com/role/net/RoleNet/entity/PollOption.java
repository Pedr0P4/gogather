package com.role.net.RoleNet.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "poll_options")
public class PollOption extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poll_id", nullable = false)
    private Poll poll;

    @Column(nullable = false)
    private String text;

    @Column(name = "place_id")
    private String placeId;

    @Builder.Default
    @Column(nullable = false)
    private int votes = 0;
}
