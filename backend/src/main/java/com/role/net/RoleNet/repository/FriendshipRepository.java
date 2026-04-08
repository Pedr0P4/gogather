package com.role.net.RoleNet.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.role.net.RoleNet.entity.Friendship;
import com.role.net.RoleNet.enums.FriendshipStatus;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    Optional<Friendship> findByExternalId(UUID id);
    Optional<Friendship> findByExternalIdAndRequesterId(UUID id, Long requesterId);

    List<Friendship> findByRequesterIdAndReceiverExternalId(Long requesterId, UUID receiverExternalId);

    @Query("""
        SELECT COUNT(fs) > 0
        FROM Friendship fs
        WHERE fs.requester.id = :reqid
          AND fs.receiver.externalId = :recid
          AND fs.status = :status
    """)
    boolean checkRequest(
        @Param("reqid") Long requesterId,
        @Param("recid") Long receiverId,
        @Param("status") FriendshipStatus status
    );

    @Query("""
        SELECT COUNT(fs) > 0
        FROM Friendship fs
        WHERE fs.requester.id = :reqid
          AND fs.receiver.externalId = :recid
          AND fs.status = :status
    """)
    boolean checkRequest(
        @Param("reqid") UUID requestId,
        @Param("recid") UUID receiverId,
        @Param("status") FriendshipStatus status
    );

    @Query("""
        SELECT COUNT(fs) > 0
        FROM Friendship fs
        WHERE fs.requester.id = :reqid
          AND fs.receiver.externalId = :recid
          AND fs.status = :status
    """)
    boolean checkRequest(
        @Param("reqid") Long requesterId,
        @Param("recid") UUID receiverId,
        @Param("status") FriendshipStatus status
    );

    @Query("""
        SELECT COUNT(fs) > 0
        FROM Friendship fs
        WHERE fs.requester.id = :reqid
          AND fs.receiver.externalId = :recid
          AND fs.status = :status
    """)
    boolean checkRequest(
        @Param("reqid") UUID requestId,
        @Param("recid") Long receiverId,
        @Param("status") FriendshipStatus status
    );
}
