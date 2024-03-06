import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class BaseFilterDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @Type(() => Number)
    page: number;

    @ApiProperty({ example: 10 })
    @IsNumber()
    @Type(() => Number)
    take: number;
}