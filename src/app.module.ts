import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PostsModule } from "./posts/posts.module";
// import * as joi from 'joi';
import appConfig from "./config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OAuthModule } from "./oauth/oauth.module";
import { OAuthUsersModule } from "./oAuthUsers/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env", // specify the path to your .env file
      isGlobal: true, // this will make the config module available globally, so we don't need to import it in other modules
      // validationSchema: joi.object({
      //   APP_NAME: joi.string().default('My NestJS App'),
      // }),
      load: [appConfig],
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Note: set to false in production
    }),

    //18 march 2026 , rate-limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 5,
        },
      ],
    }),

    PostsModule,

    // OAuthModule,
    // OAuthUsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Note :
// service must be exported from the curr module to be used in other module.
// while module must be imported to be used in other module.
