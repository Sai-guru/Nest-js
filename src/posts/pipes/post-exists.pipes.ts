import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postsService: PostsService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      // Ensure the target post exists; let the controller keep using the same id value
      await this.postsService.findPostById(value);
      return value;
    } catch (e) {
      throw new NotFoundException(`Post with id ${value} not found`);
    }
  }
}
