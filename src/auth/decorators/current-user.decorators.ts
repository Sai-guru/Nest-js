import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CurrentUser = createParamDecorator(
    (data:unknown, ctx : ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest();
        
        return req.user; // we will set the user in the request object in the auth guard, so we can access it here.
    }
)
   