import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
// import { Post } from './interfaces/post.interface';
// must use entity instead of interface because we are using typeorm and we need to use the repository pattern to interact with the database

import { Post as PostEntity } from "./entities/posts.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User, UserRole } from "src/auth/entities/user.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class PostsService {

  // to keep track of cache keys related to post list - step 2
  private postListCacheKeys : Set<string> = new Set(); 

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    //To interact with the cache manager instance, inject it to your class  - step 1
    @Inject(CACHE_MANAGER) private cacheManager: Cache 

  ) {}

  //for finding the posts the cache must be there
//during creation & deletion the cache must be clear 

  private readonly postResp = {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    authorName: {
      id: true,
      name: true,
      email: true,
    },
  } as const;

  //ANNOUNCEMENT
  //this change comes after admin creation managing with posts , we do this..
  //after altering the post entity ,then here now...

  async findAll(): Promise<PostEntity[]> {
    // return this.postRepository.find();
    return this.postRepository.find({
      relations: ["authorName"],
      select: this.postResp,
    });
  }

  async findPostById(id: number): Promise<PostEntity> {
    const singlePost = await this.postRepository.findOne({
      where: { id },
      //newly this relations is added to get the author details along with the post details in the response of this endpoint
      relations: ["authorName"],
      select: this.postResp,
    });

    if (!singlePost) throw new NotFoundException("Post not found");

    return singlePost;
  }

  async createPost(
    createPostData: CreatePostDto,
    authorName: User,
  ): Promise<PostEntity> {
    const newPost = this.postRepository.create({
      ...createPostData,
      createdAt: new Date(),
      authorName: authorName,
    });
    const savedPost = await this.postRepository.save(newPost);
    return this.findPostById(savedPost.id);
  }

  async updatePost(
    id: number,
    updatedPostData: UpdatePostDto,
    user: User,
  ): Promise<PostEntity> {
    const currPost = await this.postRepository.findOne({
      where: { id },
      relations: ["authorName"],
    });
    if (!currPost) throw new NotFoundException("Post not found");

    if (currPost.authorName?.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException("You can only update yourt own posts");
    }

    // Merge updatedPostData directly since authorName is not part of UpdatePostDto
    const updatedPost = this.postRepository.merge(currPost, updatedPostData, {
      updatedAt: new Date(),
    });
    await this.postRepository.save(updatedPost);
    return this.findPostById(id);
  }

  async removePost(id: number): Promise<{ message: string }> {
    const currPost = await this.postRepository.findOne({ where: { id } });
    if (!currPost) throw new NotFoundException("Post not found");

    await this.postRepository.remove(currPost);
    return { message: "Post removed successfully" };
  }
}


