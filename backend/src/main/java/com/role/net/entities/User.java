package com.role.net.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@SequenceGenerator(
    name = "id_generator",
    sequenceName = "seq_user"
)
public class User extends BaseEntity {

    @NotNull(message = "User name cannot be null!")
    @Column(nullable = false)
	private String name;

	@NotNull(message = "User email cannot be null!")
	@Column(nullable = false)
	private String email;

	@NotNull(message = "User password cannot be null!")
	@Column(nullable = false)
	private String password;

	@NotNull(message = "User birth date cannot be null!")
	@Column(name = "birthdate", nullable = false)
	private LocalDate birthDate;
}
