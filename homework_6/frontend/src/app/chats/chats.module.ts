import { NgModule } from "@angular/core";
import { CommonModule, JsonPipe } from "@angular/common";
import { ChatsService } from "./chats.service";
import { ChatsListComponent } from "./components/chats-list/chats-list.component";
import { ChatCardComponent } from "./components/chat-card/chat-card.component";

@NgModule({
  declarations: [ChatsListComponent, ChatCardComponent],
  providers: [ChatsService],
  imports: [CommonModule, JsonPipe],
  exports: [ChatsListComponent]
})
export class ChatsModule {}
