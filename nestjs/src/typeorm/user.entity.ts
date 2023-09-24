import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Closet } from "./closet.entity";
import { Role } from "src/auth/roles";

@Entity()
export class User{
    
    //dovrsiti
    @PrimaryGeneratedColumn(
        {
            type: "bigint"
        }
    )
    id: number; 

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @OneToOne(() => Closet, closet => closet.owner)
    closet: Closet;

    @Column()
    role: Role;
}