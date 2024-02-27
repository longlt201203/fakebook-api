import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CryptoModule } from "@crypto";
import { AccountsModule } from "@accounts";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        CryptoModule.register(),
        forwardRef(() => AccountsModule)
    ],
    exports: [AuthService]
})
export class AuthModule {}