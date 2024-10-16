import { Model } from "src/modules/model/entities/model.entity";
import { SaleProducts } from "../../saleProducts/entities/saleProducts.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "src/modules/subcategory/entities/subcategory.entity";

@Entity({name: "products"})
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    description:string;

    @Column("float")
    cost:number;

    @Column("float")
    profit:number;

    @Column("float")
    price:number;

    @Column("date")
    startDate:Date;

    @Column("date")
    endDate:Date;

    @ManyToOne (() => Subcategory, (subcategory) => subcategory.products)
    @JoinColumn({name:"subcategoryId"})
    subcategory: Subcategory;
    @Column({type:"uuid", nullable:true})
    subcategoryId:string;

    @ManyToOne (() => Model, (model) => model.products)
    @JoinColumn({name:"modelId"})
    model: Model;
    @Column({type: "uuid", nullable:true})
    modelId:string;

    @OneToMany (() => SaleProducts, (saleProducts) => saleProducts.product)
    saleProducts: SaleProducts[]
}

