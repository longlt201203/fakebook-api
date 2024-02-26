import { Reflector } from "@nestjs/core";
import { Role } from "./enums";

export const ForRoles = Reflector.createDecorator<Role[]>();