import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, StrategyOptions } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const options: StrategyOptions = {
      clientID: configService.get<string>("GOOGLE_CLIENT_ID") ?? "",
      clientSecret: configService.get<string>("GOOGLE_SECRET") ?? "",
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL") ?? "",
      scope: ["profile", "email"],
    };

    super(options);
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      // Without an email we can't identify the user; you may want
      // to throw an error or handle this differently.
      return null;
    }

    const user = await this.usersService.findOrCreateFromGoogle({
      provider: "google",
      providerId: profile.id,
      email,
      displayName: profile.displayName,
    });

    return user;
  }
}
