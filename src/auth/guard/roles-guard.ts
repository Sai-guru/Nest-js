import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector -> utility that will help to access metadata
  constructor(private readonly reflector: Reflector) {}

  // next method -> eg. router.post ('/',a,b,c,handler), where a and b are middlewares, and the last one is the route handler. So next will give us access to the route handler and the class that contains it.
  //canActivate method will be called for every request,
  // and it will check if the user has the required roles to access the route.

  //retrieve the roles metadata set by the roles decorator
  canActivate(context: ExecutionContext): boolean {
    // get the required roles from the metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
        context.getHandler(), //method lvl metadata
        context.getClass(), //class lvl metadata
      ],
    );
    // if no roles are required, allow access
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) throw new ForbiddenException("User not authenticated");

    // check if the user's role is in the required roles
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole)
      throw new ForbiddenException("insufficient permissions");

    return true;
  }
}
