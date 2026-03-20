import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { CurrentUser } from "./decorators/current-user.decorators";
import { Roles } from "./decorators/roles.decorators";
import { UserRole } from "./entities/user.entity";
import { RolesGuard } from "./guard/roles-guard";
import { LoginThrottlerGuard } from "./guard/login-throttler.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LoginThrottlerGuard) //applied that throttler guard here
  @Post("login")
  login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }

  @Post("refresh")
  refreshToken(@Body("refreshToken") refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  //protected route
  //current user route
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@CurrentUser() user: any) {    
    // getProfile works without an AuthService method because this endpoint does not fetch anything itself
    //  from the service layer. It just returns the authenticated user that Passport has already attached to the request.
    // return { role: user.role };
     return {
        id : user.id,
        role : user.role,
        email : user.email,
        name : user.name
    }
  }

  //protected route for admin only
  //2 lvl of check
  // one is authenticated and other is admin role check

  @Post("create-admin")
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createAdmin(@Body() registerDto: RegisterDto) {
    return this.authService.createAdmin(registerDto);
  }
}
