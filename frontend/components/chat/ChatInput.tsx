import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onTypingEvent: (isTyping: boolean) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onTypingEvent,
  disabled = false,
}) => {
  const [content, setContent] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (content.trim() && !disabled) {
      onSendMessage(content.trim());
      setContent("");
      onTypingEvent(false); // Parar de digitar ao enviar
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    
    if (disabled) return;

    // Lógica de debounce para "digitando"
    onTypingEvent(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Parar de exibir "digitando" após 2 segundos sem novas teclas
    typingTimeoutRef.current = setTimeout(() => {
      onTypingEvent(false);
    }, 2000);
  };

  // Limpar timeout no desmonte
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex items-end gap-2 p-4 border-t bg-card">
      <Textarea
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        className="min-h-[2.5rem] max-h-32 resize-none rounded-2xl"
        disabled={disabled}
        rows={1}
      />
      <Button
        size="icon"
        onClick={handleSend}
        disabled={disabled || !content.trim()}
        className="rounded-full h-10 w-10 shrink-0"
      >
        <SendHorizontal className="h-5 w-5" />
        <span className="sr-only">Enviar</span>
      </Button>
    </div>
  );
};
