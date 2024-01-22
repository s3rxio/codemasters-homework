import { UsersService } from "@/users/users.service";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./is-public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });

      const user = await this.usersService.findOne({
        where: { id: payload.id },
        select: {
          chats: true
        }
      });

      request["user"] = user;
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
