package com.role.net.RoleNet.controller;

import com.role.net.RoleNet.dto.chat.ChatMessageResponse;
import com.role.net.RoleNet.service.ChatService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/{groupId}/messages")
    public ResponseEntity<Page<ChatMessageResponse>> getChatHistory(
            @PathVariable Long groupId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        Page<ChatMessageResponse> history = chatService.getMessagesByGroup(groupId, pageable);
        
        return ResponseEntity.ok(history);
    }
}