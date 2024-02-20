import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginWithUsernameAndPasswordDto } from "./dto/login-with-username-and-password.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "@utils";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("login-with-username-and-password")
    loginWithUsernameAndPassword(@Body() dto: LoginWithUsernameAndPasswordDto) {
        return this.authService.loginWithUsernameAndPassword(dto);
    }

    @Get("profile")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    profile(@Req() request: Request) {
        return request.account;
    }
}