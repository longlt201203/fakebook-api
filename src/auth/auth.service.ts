import { BadRequestException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginWithUsernameAndPasswordDto } from "./dto/login-with-username-and-password.dto";
import { CryptoService } from "@crypto";
import { AccountsService } from "@accounts";
import { Account } from "@entities";
import { JsonWebTokenError } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { Env } from "@utils";

@Injectable()
export class AuthService {
    constructor(
        private readonly cryptoService: CryptoService,
        private readonly accountsService: AccountsService
    ) {}

    async loginWithUsernameAndPassword(dto: LoginWithUsernameAndPasswordDto) {
        const account = await this.accountsService.findByUsername(dto.username);
        // Verify password with RSA-SHA256
        if (!this.cryptoService.verifySomething(dto.password, account.password)) {
            throw new UnauthorizedException("Incorrect password!");
        }
        // Verify password with HMAC-SHA256
        // if (this.cryptoService.hmacSomething(dto.password) != account.password) {
        //     throw new UnauthorizedException("Incorrect password!");
        // }
        return { accessToken: this.cryptoService.signJwt(account.id) };
    }

    async verifyAccessToken(accessToken: string) {
        let account: Account = null;
        try {
            const accountId = this.cryptoService.verifyJwt(accessToken);
            account = await this.accountsService.findById(accountId, { detail: true });
        } catch (err) {
            if (!(err == JsonWebTokenError || err == HttpException)) {
                console.log(err);
            }
        }
        return account;
    }

    async loginWithGoogle(credential: string) {
        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: Env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload.email) {
            throw new BadRequestException("Wrong Google ID Token");
        }

        const account = await this.accountsService.findByEmail(payload.email, { detail: true });
        return { accessToken: this.cryptoService.signJwt(account.id) };
    }
}