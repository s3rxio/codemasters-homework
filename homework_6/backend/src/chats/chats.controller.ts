import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chatsService.findOneById(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(+id, updateChatDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chatsService.remove(+id);
  }

  @Post(":id/join")
  joinMember(@Param("id") id: string) {
    return this.chatsService.joinMember(+id);
  }

  @Post(":id/leave")
  leaveMember(@Param("id") id: string) {
    return this.chatsService.leaveMember(+id);
  }

  @Get(":id/messages")
  getMessages(
    @Param("id") id: string,
    @Query("limit") limit = 20,
    @Query("offset") offset = 0
  ) {
    return this.chatsService.getMessages(+id, +limit, +offset);
  }

  @Post(":id/messages")
  createMessage(@Param("id") id: string, @Body() createMessageDto: any) {
    return this.chatsService.createMessage(+id, createMessageDto);
  }
}
