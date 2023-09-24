import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Clothes } from "./clothes.entity";
import { Outfit } from "./outfit.entity";

@Entity()
export class Closet{

    @PrimaryGeneratedColumn(
        {
            type: "bigint"
        }
    )
    id: number;

    @OneToOne(() => User, user => user.closet)
    owner: User;

    @OneToMany(() => Clothes, clothes => clothes.closet)
    clothes: Clothes[];

    @OneToMany(() => Outfit, outfit => outfit.closet)
    outfits: Outfit[];
}