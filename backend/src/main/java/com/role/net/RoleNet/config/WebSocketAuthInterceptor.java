package com.role.net.RoleNet.config;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

/**
 * Interceptor that captures the authenticated user during the SockJS HTTP
 * handshake (where SecurityFilter already ran) and stores it in the WebSocket
 * session attributes so it can later be promoted to a STOMP Principal.
 */
@Component
public class WebSocketAuthInterceptor implements HandshakeInterceptor {

    private static final String USER_ATTR = "AUTHENTICATED_USER";

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) throws Exception {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated()) {
            attributes.put(USER_ATTR, auth);
        }

        return true;
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception
    ) {
        // nothing to do
    }
}
