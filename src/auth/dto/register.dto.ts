import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: "Name must be a string" })
    @MinLength(3, { message: "Name must be at least 3 characters long" })
    @MaxLength(20, { message: "Name must not be more than 20 characters long" })
    name!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @MaxLength(15, { message: "Password must not be more than 15 characters long" })
    password!: string;
}