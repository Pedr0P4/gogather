"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useChatWebSocket } from "@/lib/hooks/useChatWebSocket";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { PaginatedChatHistory, GroupDetails } from "@/types/chat";
import { Loader2, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ChatContainerProps {
  externalId: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ externalId }) => {
  const { messages, setMessages, typingUsers, isConnected, sendMessage, sendTypingEvent } = useChatWebSocket(externalId);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const { user } = useAuth();

  const fetchGroupDetails = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/groups/${externalId}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data: GroupDetails = await response.json();
        setGroupDetails(data);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do grupo:", error);
    }
  }, [externalId]);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/groups/${externalId}/messages?page=0&size=50`, {
        credentials: "include",
      });

      if (response.ok) {
        const data: PaginatedChatHistory = await response.json();
        const reversedMessages = [...data.content].reverse();
        
        setMessages((prev) => {
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
  }, [externalId, setMessages]);

  useEffect(() => {
    if (user) {
      fetchGroupDetails();
      fetchHistory();
    }
  }, [fetchGroupDetails, fetchHistory, user]);

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month} às ${hours}h${minutes !== "00" ? minutes : ""}`;
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-4xl mx-auto border rounded-xl shadow-sm overflow-hidden bg-background">
      {/* Header */}
      <div className="p-4 border-b bg-card flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-card-foreground text-lg leading-tight">
            {groupDetails?.name ?? "Carregando..."}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {groupDetails && (
              <>
                <span>{formatEventDate(groupDetails.eventDate)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {groupDetails.members.length} participante{groupDetails.members.length !== 1 ? "s" : ""}
                </span>
              </>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {isConnected ? "Online" : "Conectando..."}
            </span>
          </div>
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
