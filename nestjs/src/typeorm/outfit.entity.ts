import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clothes } from "./clothes.entity";
import { Closet } from "./closet.entity";

@Entity()
export class Outfit{

    @PrimaryGeneratedColumn(
        {
            type: "bigint"
        }
    )
    id: number;

    @ManyToMany(() => Clothes, clothes => clothes.outfits)
    @JoinTable()
    clothes: Clothes[];

    @ManyToOne(() => Closet, closet => closet.outfits)
    closet: Closet;
}
