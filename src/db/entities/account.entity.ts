import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ type: "text" })
    password: string;
}