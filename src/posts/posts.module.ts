import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [PostsService],
  // exports: [PostsService],
  controllers: [PostsController],
  imports: [DatabaseModule],
})
export class PostsModule {}
