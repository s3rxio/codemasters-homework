import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);

    if (user?.code !== loginDto.code) {
      throw new UnauthorizedException("Username or password is incorrect");
    }

    const token = this.generateToken(user.id);
    return {
      token
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    const token = this.generateToken(user.id);
    return {
      token
    };
  }

  private generateToken(userId: number) {
    const token = this.jwtService.sign({ id: userId });

    return token;
  }
}
