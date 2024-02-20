import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}