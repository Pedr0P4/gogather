import { useEffect, useState, useCallback, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatMessage, TypingEvent } from "@/types/chat";
import { useAuth } from "@/context/AuthContext";

export const useChatWebSocket = (groupId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const clientRef = useRef<Client | null>(null);
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    const client = new Client({
      webSocketFactory: () => new SockJS(`${apiUrl}/ws-chat`),
      connectHeaders: {},
      debug: (str) => {
        console.log("[STOMP]", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setIsConnected(true);
        
        // Subscribe to messages
        client.subscribe(`/topic/group/${groupId}`, (message: IMessage) => {
          const chatMessage: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, chatMessage]);
        });

        // Subscribe to typing events
        client.subscribe(`/topic/group/${groupId}/typing`, (message: IMessage) => {
          const typingEvent: TypingEvent = JSON.parse(message.body);
          
          // Ignore our own typing events
          if (typingEvent.senderName === user?.displayName || typingEvent.senderName === user?.username) return;

          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            if (typingEvent.isTyping) {
              newSet.add(typingEvent.senderName);
            } else {
              newSet.delete(typingEvent.senderName);
            }
            return newSet;
          });
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [groupId, user?.displayName, user?.username]);

  const sendMessage = useCallback(
    (content: string) => {
      if (clientRef.current && clientRef.current.connected && user) {
        clientRef.current.publish({
          destination: `/app/chat/${groupId}/send`,
          body: JSON.stringify({ content, requiresAiResponse: false }),
        });
      } else {
        console.warn("Cannot send message: WebSocket not connected or user not logged in.");
      }
    },
    [groupId, user]
  );

  const sendTypingEvent = useCallback(
    (isTyping: boolean) => {
      if (clientRef.current && clientRef.current.connected && user) {
        clientRef.current.publish({
          destination: `/app/chat/${groupId}/typing`,
          body: JSON.stringify({ senderName: user.displayName || user.username, isTyping }),
        });
      }
    },
    [groupId, user]
  );

  return {
    messages,
    setMessages,
    typingUsers,
    isConnected,
    sendMessage,
    sendTypingEvent,
  };
};
