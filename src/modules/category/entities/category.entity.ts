import { Subcategory } from "src/modules/subcategory/entities/subcategory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:"categories" })
export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar")
    category: string

    @OneToMany (() => Subcategory, (subcategory) => subcategory.category)
    subcategories: Subcategory[];

}