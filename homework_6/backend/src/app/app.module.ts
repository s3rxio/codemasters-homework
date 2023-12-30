import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "@/users/users.module";
import { ChatsModule } from "@/chats/chats.module";
import { GatewayModule } from "@/gateway/gateway.module";
import { AuthModule } from "@/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/auth/auth.guard";

@Module({
  imports: [UsersModule, ChatsModule, GatewayModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
