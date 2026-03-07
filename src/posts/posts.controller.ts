import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
// import { UsePipes, ValidationPipe} from '@nestjs/common/pipes';
import { PostsService } from "./posts.service";
import { Post as PostEntity } from "./entities/posts.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostExistsPipe } from "./pipes/post-exists.pipes";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get("")
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(":id")
  async findPostById(
    @Param("id", ParseIntPipe, PostExistsPipe) id: number,
  ): Promise<PostEntity> {
    return this.postsService.findPostById(id);
  }

  @Post("create")
  @HttpCode(HttpStatus.CREATED) // by default post request returns 201 status code but we can also explicitly set it using this decorator
  // @HttpCode(201) // by default post request returns 201 status code but we can also explicitly set it using this decorator

  // ---------------
  //if needed to validate the incoming data for this specific route, we can use the @UsePipes decorator to apply the ValidationPipe only to this route handler.
  //  This allows us to ensure that the data being sent to this endpoint adheres to the defined validation rules in our DTO (Data Transfer Object) classes.
  // @UsePipes(
  //     new ValidationPipe({
  //         whitelist: true,//strips properties that do not have any decorators
  //         forbidNonWhitelisted: true,
  //     }),
  // )
  // -----------------

  //   Before using DTOs
  // createPost(@Body()createPostData : Omit<PostInterfaceData,'id' | 'createdAt'>) : PostInterfaceData {

  //after using DTO
  createPost(@Body() createPostData: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostData);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Param("id", ParseIntPipe, PostExistsPipe) id: number,
    @Body() updatedPostData: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatedPostData);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK) // by default delete request returns 204 status code but we can also explicitly set it using this decorator
  async removePost(
    @Param("id", ParseIntPipe, PostExistsPipe) id: number,
  ): Promise<{ message: string }> {
    return this.postsService.removePost(id);
  }
}
