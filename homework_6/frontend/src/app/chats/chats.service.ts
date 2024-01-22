import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Chat,
  ChatWithoutMembers,
  CreateChatDto,
  CreateMessageDto,
  Message,
  UpdateChatDto
} from "./chat";

@Injectable({
  providedIn: "root"
})
export class ChatsService {
  constructor(private http: HttpClient) {}

  fetchChats() {
    return this.http.get<Chat[]>("/chats");
  }

  fetchChat(chatId: number) {
    return this.http.get<Chat>(`/chats/${chatId}`);
  }

  createChat(createChatDto: CreateChatDto) {
    return this.http.post<ChatWithoutMembers>("/chats", createChatDto);
  }

  deleteChat(chatId: number) {
    return this.http.delete<ChatWithoutMembers>(`/chats/${chatId}`);
  }

  renameChat(chatId: number, updateChatDto: UpdateChatDto) {
    return this.http.patch<Chat>(`/chats/${chatId}`, updateChatDto);
  }

  joinChat(chatId: number) {
    return this.http.post<Chat>(`/chats/${chatId}/join`, {});
  }

  leaveChat(chatId: number) {
    return this.http.post<ChatWithoutMembers>(`/chats/${chatId}/leave`, {});
  }

  sendMessage(chatId: number, createMessageDto: CreateMessageDto) {
    return this.http.post<Message>(
      `/chats/${chatId}/messages`,
      createMessageDto
    );
  }

  fetchMessages(chatId: number, limit = 20, offset = 0) {
    return this.http.get<Message[]>(
      `/chats/${chatId}/messages?limit=${limit}&offset=${offset}`
    );
  }
}
