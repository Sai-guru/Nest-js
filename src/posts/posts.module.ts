import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/posts.entity";

@Module({
  providers: [PostsService],
  // exports: [PostsService],
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([Post])],  // this will make the Post entity 
  // available for dependency injection in the PostsService,
  //  allowing us to use the repository pattern
  //  to interact with the database.
})
export class PostsModule {}
