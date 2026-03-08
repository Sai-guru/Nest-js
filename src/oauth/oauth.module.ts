import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./google.strategy";
import { AuthController } from "./oauth.controller";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./oauth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule.register({ session: false }),
    // UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>("JWT_SECRET") ?? "", // avoid undefined
        signOptions: {
          expiresIn: configService.get<number>("JWT_EXPIRES_IN") ?? 3600,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
