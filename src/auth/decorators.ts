import { Reflector } from "@nestjs/core";
import { Role } from "./enums";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "@utils";

export const ForRoles = Reflector.createDecorator<Role[]>();

export const CurrentUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.account;
});