import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginWithUsernameAndPasswordDto } from "./dto/login-with-username-and-password.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DtoMapper, Request } from "@utils";
import { AuthGuard } from "./auth.guard";
import { AccountResponseDto } from "@accounts";
import { CurrentUser } from "./decorators";
import { Account } from "@entities";

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
    profile(@CurrentUser() account: Account) {
        return DtoMapper.mapOne(account, AccountResponseDto);
    }

    @Get("login-with-google")
    loginWithGoogle(@Query("credential") credential: string) {
        return this.authService.loginWithGoogle(credential);
    }
}