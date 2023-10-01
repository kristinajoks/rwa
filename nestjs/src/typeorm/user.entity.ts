import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Closet } from "./closet.entity";
import { Role } from "../auth/roles";

@Entity()
export class User{
    
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

    @OneToOne(() => Closet, closet => closet.owner,
    {
        eager: true,
        cascade: true
    })
    @JoinColumn()
    closet: Closet;

    @Column()
    role: Role;
}