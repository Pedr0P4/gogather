import React from "react";
import { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  onVote: (optionId: number) => void;
}

import { useAuth } from "@/context/AuthContext";

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser, onVote }) => {
  const { user } = useAuth();
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
        
        {message.poll && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="text-xs font-semibold text-gray-500/80 mb-1 border-b border-gray-200/50 pb-1 flex justify-between items-center">
              <span>ENQUETE</span>
              <span className="font-normal text-gray-400">
                {message.poll.options.reduce((sum, opt) => sum + opt.votes, 0)} votos
              </span>
            </div>
            {[...message.poll.options]
              .sort((a, b) => b.votes - a.votes)
              .map((option) => {
              const hasVoted = user?.id ? option.voterIds.includes(user.id) : false;
              const totalVotes = message.poll!.options.reduce((sum, opt) => sum + opt.votes, 0);
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              
              return (
                <button
                  key={option.id}
                  onClick={() => onVote(option.id)}
                  className={cn(
                    "relative w-full overflow-hidden flex justify-between items-center border rounded-lg px-3 py-2 text-sm transition-all text-left group/option",
                    hasVoted 
                      ? "border-[#458588] shadow-sm" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div 
                    className={cn(
                      "absolute inset-y-0 left-0 transition-all duration-500 ease-out",
                      hasVoted ? "bg-[#458588]/15" : "bg-gray-100"
                    )}
                    style={{ width: `${percentage}%` }}
                  />

                  <span className={cn("relative z-10 flex-1 font-medium", hasVoted ? "text-[#458588]" : "text-gray-700")}>
                    {option.text}
                  </span>
                  
                  <div className="relative z-10 flex items-center gap-2 shrink-0 ml-2">
                    {totalVotes > 0 && (
                      <span className={cn("text-xs font-semibold", hasVoted ? "text-[#458588]" : "text-gray-500")}>
                        {percentage}%
                      </span>
                    )}
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full",
                      hasVoted ? "bg-[#458588] text-white" : "bg-gray-100 text-gray-600 group-hover/option:bg-gray-200"
                    )}>
                      {option.votes}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

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
