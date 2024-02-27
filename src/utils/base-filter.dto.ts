import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class BaseFilterDto {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    take: number;
}