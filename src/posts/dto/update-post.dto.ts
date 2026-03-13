import {  IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class UpdatePostDto {
    
    @IsOptional()
    @IsNotEmpty({ message: "Post title is required" })
    @IsString({ message: "Title must be a string" })
    @MinLength(3, { message: "Title must be at least 3 characters long" })
    @MaxLength(20, { message: "Title must not be more than 20 characters long" })
    title?:string;

    @IsOptional()
    @IsNotEmpty({ message: "Post title is required" })
    @IsString({ message: "Content must be a string" })
    @MinLength(5, { message: "Content must be at least 5 characters long" })
    @MaxLength(500, { message: "Content must not be more than 500 characters long" })
    content?:string;

    // @IsOptional()
    // @IsNotEmpty({ message: "Post title is required" })
    // @IsString({ message: "Author name must be a string" })
    // @MinLength(3, { message: "Author name must be at least 3 characters long" })
    // @MaxLength(50, { message: "Author name must not be more than 50 characters long" })
    // authorName?:string;
}