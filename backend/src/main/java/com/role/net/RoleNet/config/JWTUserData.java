package com.role.net.RoleNet.config;

import lombok.Builder;

public record JWTUserData(Long userId, String email) {
    //public JWTUserData(){this(null, null);}
}
