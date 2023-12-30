import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { IsPublic } from "./is-public.decorator";

@IsPublic()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() createUserDto: LoginDto) {
    return this.authService.login(createUserDto);
  }

  @Post("register")
  async register(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }
}
