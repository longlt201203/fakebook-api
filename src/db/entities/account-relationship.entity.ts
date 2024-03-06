import { AccountRelationshipType } from "../../utils/enums";
import { Account } from "./account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["accountA", "accountB"])
export class AccountRelationship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: AccountRelationshipType })
    type: AccountRelationshipType;

    @ManyToOne(() => Account)
    accountA: Account;

    @ManyToOne(() => Account)
    accountB: Account;
}