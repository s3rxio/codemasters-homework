import { Chat } from "../chats/chat";

export interface User {
  id: number;
  username: string;
  avatarUrl: string;

  chats: Chat[];
}
