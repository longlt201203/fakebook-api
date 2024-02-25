import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class AccountDetailDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fname: string;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(120)
    age: number;

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;
}