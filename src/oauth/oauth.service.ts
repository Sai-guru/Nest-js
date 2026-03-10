import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OAuthUser } from "../oAuthUsers/entities/user.entity";

@Injectable()
export class OAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: OAuthUser): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
