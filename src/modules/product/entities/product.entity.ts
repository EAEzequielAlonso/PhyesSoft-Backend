import { SaleProducts } from "src/modules/sale/entities/saleProducts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({type:"uuid", nullable:true})
    subcategoryId:string;

    @Column({type: "uuid", nullable:true})
    modelId:string;

    @OneToMany (() => SaleProducts, (saleProducts) => saleProducts.product)
    saleProducts: SaleProducts[]
}

