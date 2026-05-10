export interface PollOptionResponse {
  id: number;
  text: string;
  placeId: string | null;
  votes: number;
  voterIds: number[];
}

export interface PollResponse {
  id: number;
  options: PollOptionResponse[];
}

export interface ChatMessage {
  content: string;
  senderName: string;
  type: "USER" | "AI";
  createdAt: string;
  poll?: PollResponse;
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
