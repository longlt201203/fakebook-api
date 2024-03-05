import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "@utils";
import { ForRoles } from "./decorators";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}
    
    async canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get(ForRoles, ctx.getHandler());
        if (req.account && (roles && roles.includes(req.account.role))) return true;
        return false;
    }
}