import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "@/users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1d" }
      })
    }),
    UsersModule
  ],
  exports: [JwtModule]
})
export class AuthModule {}
