import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  private readonly defaultSelect: Prisma.UserSelect = {
    id: true,
    username: true,
    avatarUrl: true,
    code: false,
    updatedAt: true,
    createdAt: true
  };

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const isExist = await this.prisma.user.findFirst({
      where: {
        username: createUserDto.username
      }
    });

    if (isExist) {
      throw new BadRequestException("User already exists");
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto
      },
      select: this.defaultSelect
    });
  }

  async findMany({ where, select }: Omit<Prisma.UserFindManyArgs, "include">) {
    const users = await this.prisma.user.findMany({
      where,
      select: {
        ...this.defaultSelect,
        _count: true,
        ...select
      }
    });

    return users;
  }

  async findOne({ where, select }: Omit<Prisma.UserFindUniqueArgs, "include">) {
    const user = await this.prisma.user.findUnique({
      where,
      select: {
        ...this.defaultSelect,
        ...select
      }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findOneById(id: number, select?: Prisma.UserFindUniqueArgs["select"]) {
    const user = await this.findOne({
      where: { id },
      ...select
    });

    const userChats = await this.prisma.chat.findMany({
      where: {
        members: {
          some: {
            memberId: id
          }
        }
      },
      include: { members: true }
    });

    return { ...user, chats: userChats };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneById(id);

    const user = await this.prisma.user.update({
      where: { id },
      select: this.defaultSelect,
      data: updateUserDto
    });

    return user;
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.prisma.user.delete({
      where: { id },
      select: this.defaultSelect
    });

    return {
      ok: true,
      message: "User deleted"
    };
  }
}
