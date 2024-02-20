import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "@utils";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) {}

    getAccessToken(req: Request) {
        let token = "";
        const authorization = req.headers.authorization;
        if (authorization && authorization.startsWith("Bearer ")) {
            token = authorization.slice("Bearer ".length, authorization.length);
        }
        return token;
    }

    async canActivate(ctx: ExecutionContext) {
        const request = ctx.switchToHttp().getRequest<Request>();
        const token = this.getAccessToken(request);
        const account = await this.authService.verifyAccessToken(token);
        if (!account) return false;
        request.account = account;
        return true;
    }
}