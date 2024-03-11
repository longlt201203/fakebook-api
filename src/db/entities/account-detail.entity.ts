import { faker } from "@faker-js/faker";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountDetail {
    static fakeOne(gender: "male" | "female") {
        const detail = new AccountDetail();
        detail.lname = faker.person.lastName(gender);
        detail.fname = faker.person.firstName(gender);
        detail.age = faker.number.int({ min: 13, max: 80 });
        detail.avt = faker.image.avatar();
        detail.email = faker.internet.email();
        return detail;
    }

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

    @Column({ type: "text", nullable: true })
    avt: string;
}