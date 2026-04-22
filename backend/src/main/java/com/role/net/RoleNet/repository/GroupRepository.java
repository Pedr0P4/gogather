package com.role.net.RoleNet.repository;

import com.role.net.RoleNet.entity.Group;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

	@Query("SELECT g FROM Group g JOIN g.members m WHERE m.user.id = :userId")
    List<Group> findGroupsByUserId(@Param("userId") Long userId);

	Optional<Group> findByExternalId(UUID externalId);

	Optional<Group> findByInviteCode(String inviteCode);
}