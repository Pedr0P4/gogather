package com.role.net.RoleNet.service;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.role.net.RoleNet.dto.Friendship.FriendshipResponse;
import com.role.net.RoleNet.entity.Friendship;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.enums.FriendshipStatus;
import com.role.net.RoleNet.exception.BadRequestException;
import com.role.net.RoleNet.exception.InvalidRequestException;
import com.role.net.RoleNet.exception.ResourceNotFoundException;
import com.role.net.RoleNet.repository.FriendshipRepository;
import com.role.net.RoleNet.repository.UserRepository;

@Service
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public FriendshipService(
        FriendshipRepository friendshipRepository,
        UserRepository userRepository
    ) {
        this.friendshipRepository = friendshipRepository;
        this.userRepository = userRepository;
    }

    public FriendshipResponse details(Long requesterId, UUID friendshipExternalId) {
        Friendship friendship = friendshipRepository.findByExternalId(friendshipExternalId)
            .orElseThrow(() -> new ResourceNotFoundException("Friendship nor found."));
        return FriendshipResponse.from(friendship);
    }

    public FriendshipResponse send(Long requesterId, UUID receiverExternalId) {

        if(friendshipRepository.checkRequest(requesterId, receiverExternalId, FriendshipStatus.PENDING))
            throw new InvalidRequestException("Friendship request already sent");
        if(friendshipRepository.checkRequest(requesterId, receiverExternalId, FriendshipStatus.ACCEPTED))
            throw new InvalidRequestException("Friendship request already accepted");

        User requester = userRepository.findById(requesterId)
            .orElseThrow(() -> new ResourceNotFoundException("Requester not found."));
        User receiver = userRepository.findByExternalId(receiverExternalId)
            .orElseThrow(() -> new ResourceNotFoundException("Receiver not found."));

        Friendship friendship = Friendship.builder()
            .requester(requester)
            .receiver(receiver)
            .friendshipDate(null)
            .status(FriendshipStatus.PENDING)
            .build();

        friendshipRepository.save(friendship);
        return FriendshipResponse.from(friendship);
    }

    public FriendshipResponse accept(Long requesterId, UUID friendshipExternalId) {
        Friendship friendship = friendshipRepository.findByExternalIdAndRequesterId(friendshipExternalId, requesterId)
            .orElseThrow(() -> new ResourceNotFoundException("Friendship not found"));

        if (friendship.getStatus() == FriendshipStatus.PENDING){
            friendship.setStatus(FriendshipStatus.ACCEPTED);
            friendship.setFriendshipDate(LocalDate.now());
        } else throw new InvalidRequestException("Friendship isn't pending");

        Friendship updatedFriendship = friendshipRepository.save(friendship);
        return FriendshipResponse.from(updatedFriendship);
    }

    public FriendshipResponse refuse(Long requesterId, UUID friendshipExternalId) {
        Friendship friendship = friendshipRepository.findByExternalIdAndRequesterId(friendshipExternalId, requesterId)
            .orElseThrow(() -> new ResourceNotFoundException("Friendship not found"));

        if (friendship.getStatus() == FriendshipStatus.PENDING) friendship.setStatus(FriendshipStatus.REJECTED);
        else throw new InvalidRequestException("Friendship isn't pending");

        Friendship updatedFriendship = friendshipRepository.save(friendship);
        return FriendshipResponse.from(updatedFriendship);
    }
}
