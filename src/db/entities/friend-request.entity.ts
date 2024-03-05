import { Account } from "./account.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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