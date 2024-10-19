import { Category } from "src/modules/category/entities/category.entity";
import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "subcategories"})
export class Subcategory {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar")
    subcategory: string

    @OneToMany (() => Product, (product) => product.subcategory)
    products: Product[];

    @ManyToOne (() => Category, (category) => category.subcategories)
    @JoinColumn({name:"categoryId"})
    category: Category;
    @Column({type: "uuid", nullable:true})
    categoryId:string;

    @ManyToOne (() => Commerce, (commerce) => commerce.subcategories)
    @JoinColumn({name:"commerceId"})
    commerce: Commerce;
    @Column({type: "uuid", nullable:true})
    commerceId:string;

}
