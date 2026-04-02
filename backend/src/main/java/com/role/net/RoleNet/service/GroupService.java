package com.role.net.RoleNet.service;

import com.role.net.RoleNet.dto.Group.CreateGroupRequest;
import com.role.net.RoleNet.dto.Group.CreateGroupResponse;
import com.role.net.RoleNet.entity.Group;
import com.role.net.RoleNet.entity.GroupMember;
import com.role.net.RoleNet.entity.GroupRole;
import com.role.net.RoleNet.entity.User;
import com.role.net.RoleNet.repository.GroupRepository;
import com.role.net.RoleNet.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CreateGroupResponse create(CreateGroupRequest request, Long userId) {
        User adminUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = Group.builder()
                .name(request.name())
                .description(request.description())
                .build();

        GroupMember adminMember = GroupMember.builder()
                .group(group)
                .user(adminUser)
                .role(GroupRole.ADMIN)
                .build();

        group.getMembers().add(adminMember);

        Group savedGroup = groupRepository.saveAndFlush(group);

        return new CreateGroupResponse(
                savedGroup.getExternalId(),
                savedGroup.getName(),
                savedGroup.getDescription(),
                savedGroup.getInviteCode(),
                savedGroup.getCreatedAt()
        );
    }
}