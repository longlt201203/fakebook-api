import { Role } from "@auth";
import { Expose, Type } from "class-transformer";
import { AccountDetailDto } from "src/accounts/dto/account-detail.dto";

export class AccountResponseDto {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    role: Role;

    @Expose()
    @Type(() => AccountDetailDto)
    detail?: AccountDetailDto;
}