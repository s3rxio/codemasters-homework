import { CreateMessageDto } from "./dto/create-message.dto";
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { REQUEST } from "@nestjs/core";
import { Gateway } from "@/gateway/gateway";
import { Prisma } from "@prisma/client";

@Injectable()
export class ChatsService {
  private readonly defaultMessageSelect: Prisma.MessageSelect = {
    id: true,
    content: true,
    author: {
      select: {
        id: true,
        username: true,
        avatarUrl: true
      }
    },
    authorId: true,
    chatId: true
  };

  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private req: Request,
    private gateway: Gateway
  ) {}

  async create(createChatDto: CreateChatDto) {
    const isExist = await this.prisma.chat.findFirst({
      where: {
        name: createChatDto.name
      }
    });

    if (isExist) {
      throw new BadRequestException("Chat already exists");
    }

    return await this.prisma.chat.create({
      data: {
        ...createChatDto,
        ownerId: this.req["user"].id,
        members: {
          create: {
            memberId: this.req["user"].id
          }
        }
      }
    });
  }

  findMany(args?: Prisma.ChatFindManyArgs) {
    return this.prisma.chat.findMany({
      ...args,
      select: {
        _count: true,
        ...args.select
      }
    });
  }

  async findOneById(
    id: number,
    args?: Omit<Prisma.ChatFindUniqueArgs, "where">
  ) {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      ...args
    });

    if (!chat) {
      throw new NotFoundException("Chat not found");
    }

    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.findOneById(id);

    const isOwner = chat.ownerId === this.req["user"].id;
    if (!isOwner) {
      throw new BadRequestException("Not owner");
    }

    return await this.prisma.chat.update({
      where: { id },
      data: updateChatDto
    });
  }

  async remove(id: number) {
    const chat = await this.findOneById(id);

    const isOwner = chat.ownerId === this.req["user"].id;
    if (!isOwner) {
      throw new BadRequestException("Not owner");
    }

    return this.prisma.chat.delete({ where: { id } });
  }

  async joinMember(chatId: number) {
    const chat = await this.findOneById(chatId, {
      include: {
        members: true
      }
    });

    const isExist = chat.members.some(m => m.memberId === this.req["user"].id);
    if (isExist) {
      throw new BadRequestException("Already joined");
    }

    this.gateway.server.fetchSockets().then(sockets => {
      const socket = sockets.find(
        socket => socket.data.id === this.req["user"].id
      );

      if (socket) {
        socket.join(chatId.toString());
      }
    });

    return this.prisma.chat.update({
      where: { id: chatId },
      data: {
        members: {
          create: {
            memberId: this.req["user"].id
          }
        }
      },
      include: { members: true }
    });
  }

  async leaveMember(chatId: number) {
    const chat = await this.findOneById(chatId, {
      include: {
        members: true
      }
    });

    const isOwner = chat.ownerId === this.req["user"].id;
    if (isOwner) {
      throw new BadRequestException("Cannot leave because you are the owner");
    }

    const isExist = chat.members.some(m => m.memberId === this.req["user"].id);
    if (!isExist) {
      throw new BadRequestException("Already left");
    }

    this.gateway.server.fetchSockets().then(sockets => {
      const socket = sockets.find(
        socket => socket.data.id === this.req["user"].id
      );

      socket?.leave(chatId.toString());
    });

    return await this.prisma.chat.update({
      where: { id: chatId },
      data: {
        members: {
          delete: {
            chatId_memberId: {
              chatId,
              memberId: this.req["user"].id
            }
          }
        }
      }
    });
  }

  async createMessage(chatId: number, createMessageDto: CreateMessageDto) {
    const isExist = await this.prisma.chat.findFirst({
      where: {
        id: chatId,
        members: {
          some: {
            memberId: this.req["user"].id
          }
        }
      }
    });

    if (!isExist) {
      throw new BadRequestException("Not joined");
    }

    const message = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        chatId,
        authorId: this.req["user"].id
      },
      select: this.defaultMessageSelect
    });

    this.gateway.server.to(chatId.toString()).emit("messageCreate", message);
    return message;
  }

  async getMessages(chatId: number, limit = 20, offset = 0) {
    await this.findOneById(chatId);

    const messages = await this.prisma.message.findMany({
      where: {
        chatId
      },
      select: this.defaultMessageSelect,
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc"
      }
    });

    return {
      total: messages.length,
      next: offset + limit,
      prev: offset - limit,
      messages
    };
  }
}
