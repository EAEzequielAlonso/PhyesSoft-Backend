import { Brand } from "src/modules/brand/entities/brand.entity";
import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "models"})
export class Model {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar")
    model: string

    @OneToMany (() => Product, (product) => product.model)
    products: Product[];

    @ManyToOne (() => Brand, (brand) => brand.models)
    @JoinColumn({name:"brandId"})
    brand: Brand;
    @Column({type: "uuid", nullable:true})
    brandId:string;

    // @ManyToOne (() => Commerce, (commerce) => commerce.models)
    // @JoinColumn({name:"commerceId"})
    // commerce: Commerce;
    // @Column({type: "uuid", nullable:true})
    // commerceId:string;

}
