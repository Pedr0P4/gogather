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

export interface GroupDetails {
  externalId: string;
  name: string;
  description: string;
  inviteCode: string;
  createdAt: string;
  eventDate: string;
  members: GroupMemberDTO[];
}

export interface GroupMemberDTO {
  externalId: string;
  username: string;
  displayName: string;
  role: string;
  email: string;
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
