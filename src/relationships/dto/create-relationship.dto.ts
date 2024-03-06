import { ApiProperty } from "@nestjs/swagger";
import { AccountRelationshipType } from "@utils";

export class CreateRelationshipDto {
    @ApiProperty()
    accountA: string;

    @ApiProperty()
    accountB: string;

    @ApiProperty()
    type: AccountRelationshipType;
}