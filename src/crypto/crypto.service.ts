import { Inject, Injectable } from '@nestjs/common';
import { createSign, createVerify } from "node:crypto";

@Injectable()
export class CryptoService {
    constructor(
        @Inject("PRIVATE_KEY")
        private readonly privateKey: Buffer,
        @Inject("PUBLIC_KEY")
        private readonly publicKey: Buffer
    ) {}

    signSomething(something: string) {
        const sign = createSign("sha256");
        sign.update(something);
        return sign.sign(this.privateKey);
    }

    verifySomething(something: string) {
        const verify = createVerify("sha256");
        return verify.verify(this.publicKey, something);
    }
}
