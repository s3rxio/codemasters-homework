import { Module } from "@nestjs/common";
import { Gateway } from "./gateway";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";

@Module({
  providers: [Gateway],
  imports: [AuthModule, UsersModule],
  exports: [Gateway]
})
export class GatewayModule {}
