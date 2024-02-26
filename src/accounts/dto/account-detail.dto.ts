import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class AccountDetailDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    lname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Expose()
    fname: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(120)
    @Expose()
    age: number;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @Expose()
    email: string;
}