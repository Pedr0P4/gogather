package com.role.net.RoleNet.repository;

import com.role.net.RoleNet.entity.ChatMessage;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    Page<ChatMessage> findByGroupIdOrderByCreatedAtDesc(Long groupId, Pageable pageable);

    Page<ChatMessage> findByGroupExternalIdOrderByCreatedAtDesc(UUID externalId, Pageable pageable);
    
}
