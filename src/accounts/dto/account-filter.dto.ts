import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "@utils";
import { IsOptional } from "class-validator";

export class AccountFilterDto extends BaseFilterDto {
    @ApiProperty({ required: false })
    @IsOptional()
    search?: string;
}