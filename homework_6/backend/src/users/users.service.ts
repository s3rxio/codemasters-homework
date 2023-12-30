import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { exclude } from "@/core/utils/exclude";

@Injectable()
export class UsersService {
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
      }
    });
  }

  async findAll() {
    const users = (
      await this.prisma.user.findMany({ include: { chats: true } })
    ).map(u => exclude(u, "code"));

    return users;
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { chats: true }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return exclude(user, "code");
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.findOneById(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });

    return exclude(user, "code");
  }

  async remove(id: number) {
    await this.findOneById(id);

    return this.prisma.user.delete({ where: { id } });
  }
}
