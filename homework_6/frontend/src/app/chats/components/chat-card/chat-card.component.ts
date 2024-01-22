import { Router } from "@angular/router";
import { ChatsService } from "./../../chats.service";
import { Component, Input } from "@angular/core";
import { Chat } from "../../chat";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-chat-card",
  standalone: false,
  templateUrl: "./chat-card.component.html",
  styleUrl: "./chat-card.component.scss"
})
export class ChatCardComponent {
  @Input() chat!: Chat;
  error = "";

  constructor(
    private chatsService: ChatsService,
    private router: Router
  ) {}

  joinChat(chatId: number) {
    const chatJoin = this.chatsService.joinChat(chatId);

    chatJoin.subscribe(
      chat => {
        this.router.navigate(["/chats", chat.id]);
      },
      (error: HttpErrorResponse) => {
        this.error = error.error.message;
      }
    );

    return;
  }

  leaveChat(chatId: number) {}
}
