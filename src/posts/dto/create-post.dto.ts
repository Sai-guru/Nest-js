import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    @MinLength(3, { message: "Title must be at least 3 characters long" })
    @MaxLength(20, { message: "Title must not be more than 20 characters long" })
    title: string;





}