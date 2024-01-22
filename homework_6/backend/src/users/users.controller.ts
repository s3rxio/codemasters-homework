import { Controller, Get, Body, Patch, Delete, Inject } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { REQUEST } from "@nestjs/core";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(REQUEST) private req: Request
  ) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findMany({});
  // }

  @Get("me")
  findOne() {
    return this.usersService.findOneById(this.req["user"].id);
  }

  @Patch("me")
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(this.req["user"].id, updateUserDto);
  }

  @Delete("me")
  remove() {
    return this.usersService.remove(this.req["user"].id);
  }
}
