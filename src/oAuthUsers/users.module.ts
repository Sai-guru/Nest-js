import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OAuthUsersService } from "./users.service";
import { OAuthUsersController } from "./users.controller";
import { OAuthUser } from "./entities/user.entity";

@Module({
  providers: [OAuthUsersService],
  controllers: [OAuthUsersController],
  imports: [TypeOrmModule.forFeature([OAuthUser])],
  exports: [OAuthUsersService],
})
export class OAuthUsersModule {}
