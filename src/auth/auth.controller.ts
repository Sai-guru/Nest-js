import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {} 

    @Post('register')
    register(@Body() registerDto : RegisterDto){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto : any){
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken : string){
        return this.authService.refreshToken(refreshToken);
    }

    //protected route 
    //current user route


    //protected route for admin only 
    //2 lvl of check 
    // one is authenticated and other is admin role check


}
