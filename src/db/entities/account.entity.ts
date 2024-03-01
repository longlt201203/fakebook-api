import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { AccountDetail } from "./account-detail.entity";
import { Role } from "../../auth/enums";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "enum" ,enum: Role, default: Role.USER })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => AccountDetail, { cascade: true, nullable: true, orphanedRowAction: "delete" })
    @JoinColumn()
    detail: AccountDetail;
}