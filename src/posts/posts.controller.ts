import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterfaceData } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get('') 
    findAll(@Query('search') search? : string): PostInterfaceData[] {
        const extractedPosts = this.postsService.findAll();

        if(search){
            return extractedPosts.filter((singlePost)=>
                singlePost.title.toLowerCase().includes(search.toLowerCase()));
        }
        return extractedPosts;
    }


    @Get(':id')
    findPostById(@Param('id')id: number) : object {
        return this.postsService.findPostById(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED) // by default post request returns 201 status code but we can also explicitly set it using this decorator
    // @HttpCode(201) // by default post request returns 201 status code but we can also explicitly set it using this decorator
    createPost(@Body()createPostData : Omit<PostInterfaceData,'id' | 'createdAt'>) : PostInterfaceData {
        return this.postsService.createPost(createPostData);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updatePost(@Param('id', ParseIntPipe)id:number, @Body() updatedPostData : Partial<Omit<PostInterfaceData,'id' | 'createdAt'>>) : PostInterfaceData {
        return this.postsService.updatePost(id,updatedPostData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK) // by default delete request returns 204 status code but we can also explicitly set it using this decorator
    removePost(@Param('id',ParseIntPipe) id:number) {

        if(!id) throw new Error('ID is required');
        if(id <= 0 || !Number.isInteger(id)) throw new Error('ID must be a positive integer');
        this.postsService.removePost(id);
    }

}
