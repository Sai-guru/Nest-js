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
  UseGuards,
} from "@nestjs/common";
// import { UsePipes, ValidationPipe} from '@nestjs/common/pipes';
import { PostsService } from "./posts.service";
import { Post as PostEntity } from "./entities/posts.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostExistsPipe } from "./pipes/post-exists.pipes";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorators";
import { Roles } from "src/auth/decorators/roles.decorators";
import { RolesGuard } from "src/auth/guard/roles-guard";
import { UserRole } from "src/auth/entities/user.entity";

@Controller("posts")
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

  //ANNOUNCEMENT
  //this change comes after admin creation managing with posts , we do this..

  @UseGuards(JwtAuthGuard) //-->  the change
  @Post("")
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
  createPost(
    @Body() createPostData: CreatePostDto,
    @CurrentUser() user: any,
  ): Promise<PostEntity> {
    //-> the change is @CurrentUser() user : any
    return this.postsService.createPost(createPostData, user);
  }

  @UseGuards(JwtAuthGuard) //-->  the change
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async updatePost(
    @Param("id", ParseIntPipe, PostExistsPipe) id: number,
    @Body() updatedPostData: UpdatePostDto,
    @CurrentUser() user: any, //-> the change is @CurrentUser() user : any
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatedPostData, user);
  }

  @Roles(UserRole.ADMIN) //-->  the change
  @UseGuards(JwtAuthGuard, RolesGuard) //-->  enforce admin-only access
  @Delete(":id")
  @HttpCode(HttpStatus.OK) // by default delete request returns 204 status code but we can also explicitly set it using this decorator
  async removePost(
    @Param("id", ParseIntPipe, PostExistsPipe) id: number,
  ): Promise<{ message: string }> {
    return this.postsService.removePost(id);
  }
}
