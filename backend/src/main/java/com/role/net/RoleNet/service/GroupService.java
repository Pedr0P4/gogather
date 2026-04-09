package com.role.net.RoleNet.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.role.net.RoleNet.dto.Group.CreateGroupRequest;
import com.role.net.RoleNet.dto.Group.GroupDetailsResponse;
import com.role.net.RoleNet.dto.Group.GroupResponse;
import com.role.net.RoleNet.entity.EventStop;
import com.role.net.RoleNet.entity.Group;
import com.role.net.RoleNet.entity.GroupMember;
import com.role.net.RoleNet.entity.GroupRole;
import com.role.net.RoleNet.entity.User;
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

		request.stops().forEach(stopRequest -> {
            EventStop stop = EventStop.builder()
				.name(stopRequest.name())
				.latitude(stopRequest.latitude())
				.longitude(stopRequest.longitude())
				.category(stopRequest.category())
				.stopOrder(stopRequest.order())
				.group(group)
				.build();
            
            group.getEventStops().add(stop);
        });

        GroupMember adminMember = GroupMember.builder()
			.group(group)
			.user(adminUser)
			.role(GroupRole.ADMIN)
			.build();

        group.getMembers().add(adminMember);

        Group savedGroup = groupRepository.save(group);

        return new GroupResponse(
			savedGroup.getExternalId(),
			savedGroup.getName(),
			savedGroup.getDescription(),
			savedGroup.getInviteCode(),
			savedGroup.getEventDate()
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
}