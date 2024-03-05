import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    @ManyToOne(() => Account, account => account.posts)
    author: Account;
}