import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    
    @IsEmail({}, { message: 'Invalid email address' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @MaxLength(15, { message: "Password must not be more than 15 characters long" })
    password!: string;
}