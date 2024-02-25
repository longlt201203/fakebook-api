import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AccountDetail } from "./account-detail.entity";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: "text" })
    password: string;

    @OneToOne(() => AccountDetail, { cascade: true, nullable: true, orphanedRowAction: "delete" })
    @JoinColumn()
    detail: AccountDetail;
}