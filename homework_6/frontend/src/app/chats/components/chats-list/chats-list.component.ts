import { Component, Input } from "@angular/core";
import { Chat } from "../../chat";

@Component({
  selector: "app-chats-list",
  standalone: false,
  templateUrl: "./chats-list.component.html",
  styleUrl: "./chats-list.component.scss"
})
export class ChatsListComponent {
  @Input() chats!: Chat[];

  constructor() {}
}
