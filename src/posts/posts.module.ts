import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';


@Module({
  providers: [PostsService],
  // exports: [PostsService],
  controllers: [PostsController],
  imports: [],
})
export class PostsModule {}
