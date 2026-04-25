"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useChatWebSocket } from "@/lib/hooks/useChatWebSocket";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { PaginatedChatHistory } from "@/types/chat";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ChatContainerProps {
  groupId: number;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ groupId }) => {
  const { messages, setMessages, typingUsers, isConnected, sendMessage, sendTypingEvent } = useChatWebSocket(groupId);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { user } = useAuth();

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/groups/${groupId}/messages?page=0&size=50`, {
        credentials: "include",
      });

      if (response.ok) {
        const data: PaginatedChatHistory = await response.json();
        // Backend returns descending order (newest first), reverse for display
        const reversedMessages = [...data.content].reverse();
        
        setMessages((prev) => {
          // Merge: prepend history, avoid duplicates by createdAt+senderName
          const existingKeys = new Set(prev.map(m => `${m.createdAt}-${m.senderName}`));
          const newHistory = reversedMessages.filter(m => !existingKeys.has(`${m.createdAt}-${m.senderName}`));
          return [...newHistory, ...prev];
        });
      }
    } catch (error) {
      console.error("Erro ao buscar histórico de mensagens:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [groupId, setMessages]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [fetchHistory, user]);

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto border rounded-xl shadow-sm overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b bg-card flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-semibold text-card-foreground">Chat do Grupo {groupId}</h3>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {isConnected ? "Conectado em tempo real" : "Conectando..."}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-muted/10">
        {isLoadingHistory && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        
        <MessageList messages={messages} typingUsers={typingUsers} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        onTypingEvent={sendTypingEvent}
        disabled={!isConnected || isLoadingHistory}
      />
    </div>
  );
};
