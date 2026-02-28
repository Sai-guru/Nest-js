import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HelloModule } from "./practice-0/hello.module";
import { UserModule } from "./practice-1/user.module";
import { ConfigModule } from "@nestjs/config";
import { PostsModule } from './posts/posts.module';
// import * as joi from 'joi';
import appConfig from "./config/app.config";

@Module({
  imports: [
    HelloModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ".env", // specify the path to your .env file
      isGlobal: true, // this will make the config module available globally, so we don't need to import it in other modules
      // validationSchema: joi.object({
      //   APP_NAME: joi.string().default('My NestJS App'),
      // }),
      load: [appConfig],
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Note :
// service must be exported from the curr module to be used in other module.
// while module must be imported to be used in other module.
