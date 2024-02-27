import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, ValidateNested } from "class-validator";
import { AccountDetailDto } from "./account-detail.dto";
import { Type } from "class-transformer";

export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1 })
    @MaxLength(30)
    password: string;

    @ApiProperty({ type: AccountDetailDto, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => AccountDetailDto)
    detail?: AccountDetailDto;
}