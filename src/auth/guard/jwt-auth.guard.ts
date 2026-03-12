import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// protects routes that require authentication

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}
