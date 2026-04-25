export interface ChatMessage {
  content: string;
  senderName: string;
  type: "USER" | "AI";
  createdAt: string;
}

export interface TypingEvent {
  senderName: string;
  isTyping: boolean;
}

export interface PaginatedChatHistory {
  content: ChatMessage[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  empty: boolean;
}
