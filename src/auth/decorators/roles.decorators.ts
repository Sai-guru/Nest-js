import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../entities/user.entity";

// unique key to store the roles metadata on route handlers
export const ROLES_KEY = "roles";

//  -> roles decorator marks the routes with the roles that are allowed to access the route.
// -> roles guard will later reads this metadata and checks if the user has permission.

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);