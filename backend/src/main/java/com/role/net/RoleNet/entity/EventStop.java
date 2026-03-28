package com.role.net.RoleNet.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Table(name = "event_stops")
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class EventStop extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private Group group;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String formatedAddress;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private String category;

    @Column(name = "stop_order", nullable = false)
    private Integer stopOrder;  
}
