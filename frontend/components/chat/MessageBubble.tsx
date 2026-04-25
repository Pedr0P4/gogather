import React from "react";
import { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isAi = message.type === "AI";

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isAi ? "justify-center" : isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-lg px-4 py-2 flex flex-col gap-1 shadow-sm",
          isAi
            ? "bg-accent text-accent-foreground rounded-lg border border-border italic"
            : isCurrentUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-foreground rounded-bl-none border border-border"
        )}
      >
        {!isCurrentUser && (
          <span className="text-xs font-semibold text-muted-foreground">
            {message.senderName}
          </span>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <span
          className={cn(
            "text-[10px] self-end opacity-70",
            isCurrentUser ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {time}
        </span>
      </div>
    </div>
  );
};
