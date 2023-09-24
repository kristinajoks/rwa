import { ClothesOccasion, ClothesPlacement, ClothesType } from "src/shared/enums";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Closet } from "./closet.entity";
import { Outfit } from "./outfit.entity";


@Entity()
export class Clothes{

    @PrimaryGeneratedColumn(
        {
            type: "bigint"
        }
    )
    id: number;

    @Column()
    color: string;

    @Column()
    placement: ClothesPlacement;

    @Column()
    type: ClothesType;

    @Column()
    occasion: ClothesOccasion;

    @Column()
    src: string;

    @Column()
    closetId: bigint;
    
    @Column()
    isForSale: boolean;

    @Column()
    isSold: boolean;

    @Column()
    isFavorite: boolean;

    @ManyToOne(() => Closet, closet => closet.clothes)
    closet: Closet;

    @ManyToMany(() => Outfit, outfit => outfit.clothes)
    outfits: Outfit[];
}