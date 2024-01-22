import { User } from "../user/user";

export interface Chat {
  id: number;
  name: string;

  ownerId: number;
  members: User[];

  createdAt: string;
  updatedAt: string;
}

export type ChatWithoutMembers = Omit<Chat, "members">;

export interface CreateChatDto {
  name: string;
}

export type UpdateChatDto = Partial<CreateChatDto>;

export interface Message {
  id: string;
  content: string;
  authorId: number;
  chatId: number;

  createdAt: string;
  updatedAt: string;

  author: User;
}

export interface CreateMessageDto {
  content: string;
}
