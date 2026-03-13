import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    const accessTokenSecret = configService.get<string>(
      "JWT_ACCESS_TOKEN_SECRET",
    );

    if (!accessTokenSecret) {
      throw new Error("JWT_ACCESS_TOKEN_SECRET is not configured");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenSecret,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.authService.getUserById(payload.sub);
    //   return { ...user, role: payload.role };
    return {
        id : user.id,
        role : user.role,
        email : user.email,
        name : user.name
    }
    } catch {
      throw new UnauthorizedException("invalid token");
    }
  }
}
