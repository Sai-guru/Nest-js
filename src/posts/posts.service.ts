import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {

        private posts : Post[]= [
            {
                id : 1, title : 'F', 
                content : 'This is the content of the first post',
                authorName : 'John Doe',
                createdAt : new Date(), updatedAt : new Date()
            },
            {
                id : 2, title : 'S', 
                content : 'This is the content of the second post',
                authorName : 'Jane Doe',
                createdAt : new Date(), updatedAt : new Date()
            },
            {
                id : 3, title : 'T', 
                content : 'This is the content of the third post',
                authorName : 'Jim Doe',
                createdAt : new Date(), updatedAt : new Date()
            }
        ];

        findAll():Post[] {
            return this.posts;
        }

        findPostById(id : number) : Post{
            const singlePost = this.posts.find((post)=>post.id == id);

            // if(!singlePost) throw new Error('Post not found');
            // use this not found exception given by nestjs themselves
            if(!singlePost) throw new NotFoundException('Post not found');
           
            return singlePost;
        }

        createPost(createPostData : Omit<Post,'id' | 'createdAt'>) : Post {
            const newPost : Post = {
                id : this.getNextid(),
                ...createPostData,
                createdAt : new Date(), }
                 
            this.posts.push(newPost);
            return newPost;
            }
            
       private getNextid(): number {
            return this.posts.length > 0 ? 
            Math.max(...this.posts.map(post => post.id)) + 1 : 1;
        }



}