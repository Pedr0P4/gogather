package com.role.net.RoleNet.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.role.net.RoleNet.dto.group.CreateGroupRequest;
import com.role.net.RoleNet.dto.group.GroupDetailsResponse;
import com.role.net.RoleNet.dto.group.GroupResponse;
import com.role.net.RoleNet.entity.EventStop;
import com.role.net.RoleNet.entity.Group;
import com.role.net.RoleNet.entity.GroupMember;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.enums.GroupMemberStatus;
import com.role.net.RoleNet.enums.GroupRole;
import com.role.net.RoleNet.exception.InvalidRequestException;
import com.role.net.RoleNet.exception.ResourceNotFoundException;
import com.role.net.RoleNet.exception.UserNotAGroupMemberException;
import com.role.net.RoleNet.repository.GroupRepository;
import com.role.net.RoleNet.repository.UserRepository;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public GroupResponse create(CreateGroupRequest request, Long userId) {
        User adminUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Group group = Group.builder()
			.name(request.name())
			.description(request.description())
			.eventDate(request.date())
			.build();

        Group savedGroup = groupRepository.save(group);

		request.stops().forEach(stopRequest -> {
            EventStop stop = EventStop.builder()
				.name(stopRequest.name())
				.latitude(stopRequest.latitude())
				.longitude(stopRequest.longitude())
				.category(stopRequest.category())
				.stopOrder(stopRequest.order())
				.group(savedGroup) 
				.build();
            
            savedGroup.getEventStops().add(stop);
        });

        GroupMember adminMember = GroupMember.builder()
			.group(savedGroup)
			.user(adminUser)
			.role(GroupRole.ADMIN)
            .status(com.role.net.RoleNet.enums.GroupMemberStatus.ACTIVE)
            .invitedBy(null) 
			.build();

        savedGroup.getMembers().add(adminMember);

        Group updatedGroup = groupRepository.save(savedGroup);

        return new GroupResponse(
			updatedGroup.getExternalId(),
			updatedGroup.getName(),
			updatedGroup.getDescription(),
			updatedGroup.getInviteCode(),
			updatedGroup.getEventDate()
        );
    }

	public List<GroupResponse> getUserGroups(Long userId) {
        return groupRepository.findGroupsByUserId(userId).stream()
			.map(group -> new GroupResponse(
				group.getExternalId(),
				group.getName(),
				group.getDescription(),
				group.getInviteCode(),
				group.getEventDate()
			))
			.toList();
    }

	public GroupDetailsResponse getGroupDetails(UUID externalId, Long userId) {
        Group group = groupRepository.findByExternalId(externalId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found"));

        boolean isMember = group.getMembers().stream()
                .anyMatch(member -> member.getUser().getId().equals(userId));

        if (!isMember) throw new UserNotAGroupMemberException("User is not a member of this group");

        List<GroupDetailsResponse.MemberDTO> members = group.getMembers().stream()
			.map(member -> new GroupDetailsResponse.MemberDTO(
				member.getUser().getExternalId(),
				member.getUser().getUsername(),
				member.getUser().getDisplayName(),
				member.getRole(),
				member.getUser().getEmail()
			))
			.toList();

        return new GroupDetailsResponse(
			group.getExternalId(),
			group.getName(),
			group.getDescription(),
			group.getInviteCode(),
			group.getCreatedAt(),
			members
        );
    }

	@Transactional
    public void joinGroupByInviteCode(String inviteCode, User loggedInUser) {
        Group group = groupRepository.findByInviteCode(inviteCode)
            .orElseThrow(() -> new ResourceNotFoundException("Rolê não encontrado com esse código."));

        boolean alreadyMember = group.getMembers().stream() 
            .anyMatch(member -> member.getUser().getId().equals(loggedInUser.getId()));

        if (alreadyMember) {
            throw new InvalidRequestException("Você já faz parte deste rolê!");
        }

        GroupMember newMember = new GroupMember();
        newMember.setGroup(group);
        newMember.setUser(loggedInUser);
        newMember.setStatus(GroupMemberStatus.ACTIVE);
        newMember.setInvitedBy(null);
        
        newMember.setRole(GroupRole.MEMBER); 

        group.getMembers().add(newMember);
        groupRepository.save(group);
    }

    @Transactional
    public void inviteFriendToGroup(UUID groupId, UUID friendId, User loggedInUser) {
        Group group = groupRepository.findByExternalId(groupId)
            .orElseThrow(() -> new ResourceNotFoundException("Rolê não encontrado."));

        User friend = userRepository.findByExternalId(friendId)
            .orElseThrow(() -> new ResourceNotFoundException("Amigo não encontrado."));

        // AFAZER verificar aqui no FriendshipRepository se eles realmente são amigos

        boolean alreadyMember = group.getMembers().stream()
            .anyMatch(member -> member.getUser().getExternalId().equals(friendId));

        if (alreadyMember) {
            throw new InvalidRequestException("Esse usuário já está no rolê ou já foi convidado.");
        }

        GroupMember newMember = new GroupMember();
        newMember.setGroup(group);
        newMember.setUser(friend);
        newMember.setStatus(GroupMemberStatus.PENDING);
        newMember.setInvitedBy(loggedInUser);
        
        newMember.setRole(GroupRole.MEMBER); 

        group.getMembers().add(newMember);
        groupRepository.save(group);
    }

    @Transactional
    public void acceptGroupInvite(UUID groupId, User loggedInUser) {
        Group group = groupRepository.findByExternalId(groupId)
            .orElseThrow(() -> new ResourceNotFoundException("Rolê não encontrado."));

        GroupMember invite = group.getMembers().stream()
            .filter(member -> member.getUser().getId().equals(loggedInUser.getId()))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Convite não encontrado."));

        if (invite.getStatus() == GroupMemberStatus.ACTIVE) {
            throw new InvalidRequestException("Você já faz parte deste rolê.");
        }
        invite.setStatus(GroupMemberStatus.ACTIVE);
        
        groupRepository.save(group); 
    }


}