import { AccountResponseDto } from "@accounts";
import { Expose, Type } from "class-transformer";

export class FriendRequestResponseDto {
    @Expose()
    id: number;

    @Expose()
    @Type(() => AccountResponseDto)
    from: AccountResponseDto;

    @Expose()
    createdAt: Date;
}