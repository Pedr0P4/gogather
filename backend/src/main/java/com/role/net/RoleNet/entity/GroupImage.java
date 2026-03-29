package com.role.net.RoleNet.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "group_images")
@Data
@EqualsAndHashCode(callSuper = true)
public class GroupImage extends BaseEntity {

    @Column(nullable = false, name = "image_path", length = 300)
    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "uploaded_by_id")
    private User uploadedBy;
  
}
