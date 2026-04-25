"use client";

import React from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";

export default function TestChatPage() {
  // Vamos usar o groupId = 1 como padrão para o teste
  const groupId = 1;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Chat Component Test</h1>
          <p className="text-muted-foreground text-sm">
            Esta é uma página isolada apenas para testar o componente de chat em tempo real.
          </p>
        </div>
        
        <ChatContainer groupId={groupId} />
      </div>
    </div>
  );
}
