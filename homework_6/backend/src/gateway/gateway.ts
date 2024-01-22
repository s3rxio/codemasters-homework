import { UsersService } from "@/users/users.service";
import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class Gateway {
  @WebSocketServer() server: Server;
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  @SubscribeMessage("identify")
  async handleIdentify(
    @MessageBody() data: { token: string },
    @ConnectedSocket() client: Socket
  ) {
    const { token } = data;

    if (!token) {
      return { ok: false, message: "No token provided" };
    }

    const payload: { id: number } | null = await this.jwtService
      .verifyAsync(token)
      .catch(() => null);
    if (!payload) {
      return { ok: false, message: "Bad token" };
    }

    const user = await this.usersService.findOneById(payload.id, {
      chats: true
    });
    if (!user) {
      return { ok: false, message: "User not found" };
    }

    client.data = { ...user };
    const chatIds = user.chats.map(c => c.id.toString());
    await client.join(chatIds);

    return { ok: true, data: { user, rooms: chatIds } };
  }
}
