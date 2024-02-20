import { ApiProperty } from "@nestjs/swagger";

export class LoginWithUsernameAndPasswordDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}