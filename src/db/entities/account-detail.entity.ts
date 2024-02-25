import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lname: string;

    @Column()
    fname: string;

    @Column()
    age: number;

    @Column()
    email: string;
}