import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { ChatsController } from "./chats.controller";
import { GatewayModule } from "@/gateway/gateway.module";

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [PrismaModule, GatewayModule]
})
export class ChatsModule {}
