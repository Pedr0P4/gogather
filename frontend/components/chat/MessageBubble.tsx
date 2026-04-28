import React from "react";
import { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

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
        "flex w-full mb-4 group",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 flex flex-col gap-1 shadow-sm transition-all relative overflow-hidden",
          isAi
            ? "bg-white text-gray-800 rounded-bl-none border border-[#cc241a]/30 shadow-[0_4px_15px_-3px_rgba(204,36,26,0.1)]"
            : isCurrentUser
              ? "bg-[#458588] text-white rounded-br-none border-none"
              : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
        )}
      >
        {!isCurrentUser && (
          <span className={cn("text-xs font-bold flex items-center gap-1", isAi ? "text-[#cc241a]" : "text-[#458588]")}>
            {message.senderName} {isAi && <Sparkles className="w-3 h-3 text-[#cc241a]" />}
          </span>
        )}
        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
        <span
          className={cn(
            "text-[10px] self-end mt-1 font-medium",
            isCurrentUser ? "text-white/70" : "text-gray-400"
          )}
        >
          {time}
        </span>
      </div>
    </div>
  );
};
