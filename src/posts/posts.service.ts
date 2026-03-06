import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post.interface';
// must use entity instead of interface because we are using typeorm and we need to use the repository pattern to interact with the database

import { Post as PostEntity } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

        constructor(
            @InjectRepository(PostEntity)
            private readonly postRepository: Repository<PostEntity>,
        ){}

       async findAll(): Promise<PostEntity[]> {
            return this.postRepository.find();  
        }

        async findPostById(id : number) : Promise<PostEntity>{
            const singlePost = await this.postRepository.findOne({ where: { id } });

            if(!singlePost) throw new NotFoundException('Post not found');
           
            return singlePost;
        }

        async createPost(createPostData : CreatePostDto) : Promise<PostEntity> {
            const newPost = this.postRepository.create({
                ...createPostData,
                createdAt : new Date(),
            });
            return this.postRepository.save(newPost);
        }    
            

        async updatePost(id:number,updatedPostData : UpdatePostDto) : Promise<PostEntity> {

            const currPost = await this.postRepository.findOne({ where: { id } });
            if(!currPost) throw new NotFoundException('Post not found');
            
            const updatedPost = this.postRepository.merge(currPost,updatedPostData, {updatedAt : new Date()});
            return this.postRepository.save(updatedPost);
          
        } 

        async removePost(id:number) : Promise<{message : string}> {

            const currPost = await this.postRepository.findOne({ where: { id } });
            if(!currPost) throw new NotFoundException('Post not found');
            
            await this.postRepository.remove(currPost);
            return {message: "Post removed successfully"};

        }





}