import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    create(createChatDto: CreateChatDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChatDto: UpdateChatDto): string;
    remove(id: string): string;
}
