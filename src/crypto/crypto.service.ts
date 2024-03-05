import { Inject, Injectable } from '@nestjs/common';
import { Env } from '@utils';
import { createSign, createVerify, createHmac } from "node:crypto";
import * as jwt from "jsonwebtoken";

@Injectable()
export class CryptoService {
    constructor(
        @Inject("PRIVATE_KEY")
        private readonly privateKey: Buffer,
        @Inject("PUBLIC_KEY")
        private readonly publicKey: Buffer
    ) {}

    hmacSomething(something: string) {
        const hmac = createHmac("sha256", Env.HMAC_SECRET);
        hmac.update(something);
        return hmac.digest("base64");
    }

    signSomething(something: string) {
        const sign = createSign("sha256");
        sign.update(something);
        return sign.sign(this.privateKey).toString("base64");
    }

    verifySomething(something: string, signature: string) {
        const verify = createVerify("sha256");
        verify.update(something);
        return verify.verify(this.publicKey, Buffer.from(signature, "base64"));
    }

    signJwt(subject: string) {
        return jwt.sign({}, Env.JWT_SECRET, {
            subject: subject,
            issuer: Env.JWT_ISSUER,
            expiresIn: Env.JWT_EXPIRE
        });
    }

    verifyJwt(token: string) {
        const subject = jwt.verify(token, Env.JWT_SECRET, {
            issuer: Env.JWT_ISSUER,
        }).sub;
        return typeof subject == "string" ? subject : "";
    }
}
