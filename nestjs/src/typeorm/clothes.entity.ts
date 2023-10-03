import { ClothesOccasion, ClothesPlacement, ClothesType } from "../shared/enums";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Closet } from "./closet.entity";
import { Outfit } from "./outfit.entity";
import DatabaseFile from "./databaseFile.entity";


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
    isForSale: boolean;

    @Column()
    isSold: boolean;

    @Column()
    isFavorite: boolean;
    
    @JoinColumn({name: 'avatarId'})
    @OneToOne(
    () => DatabaseFile,
    {
        nullable: true
    }
    )
    avatar?: DatabaseFile;
        
    @Column({nullable: true})
    avatarId?: number;
        
    @ManyToOne(() => Closet, closet => closet.clothes)
    closet: Closet;

    @ManyToMany(() => Outfit, outfit => outfit.clothes)
    outfits: Outfit[];
}