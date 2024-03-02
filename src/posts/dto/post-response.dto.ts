import { AccountResponseDto } from "@accounts";
import { Expose, Type } from "class-transformer";

export class PostResponseDto {
    @Expose()
    id: number;
    
    @Expose()
    content: string;

    @Expose()
    createdAt: Date;

    @Expose()
    modifiedAt: Date;

    @Expose()
    @Type(() => AccountResponseDto)
    author: AccountResponseDto;
}