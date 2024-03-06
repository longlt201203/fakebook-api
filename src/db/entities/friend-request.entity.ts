import { Account } from "./account.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["from", "to"])
export class FriendRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account)
    from: Account;

    @ManyToOne(() => Account, account => account.friendRequests)
    to: Account;

    @CreateDateColumn()
    createdAt: Date;
}