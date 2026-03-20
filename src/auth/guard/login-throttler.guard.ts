import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard, ThrottlerLimitDetail } from "@nestjs/throttler";


@Injectable()
export class LoginThrottlerGuard extends ThrottlerGuard {

    protected async getTracker(req: Record<string, any>): Promise<string> {
        // Use the client's IP address as the tracker for throttling
        const email = req.body.email; // Assuming the email is sent in the request body
        return email ? `login-${email}` : super.getTracker(req); // Fallback to IP-based tracking if email is not available
    }

    //set limit and ttl for login attempts
    protected getLimit(): Promise<number> {
        return Promise.resolve(5); // Allow 5 login attempts
    }

    protected getTTL(): Promise<number> {
        return Promise.resolve(60 * 1000); // Block for 1 minute after reaching the limit
    }

    protected async throwThrottlingException(): Promise<void> {
        throw new ThrottlerException("Too many login attempts. Pls try after a minute.");
    }

}