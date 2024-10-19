
import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { SaleProducts } from "src/modules/saleProducts/entities/saleProducts.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"colors"})
export class Color {

    @PrimaryGeneratedColumn ("uuid")
    id:string

    @Column({ type: 'varchar', length: 40 })
    color:string

    @OneToMany (() => SaleProducts, (saleProduct) => saleProduct.color)
    saleProducts: SaleProducts[];

    @ManyToOne (() => Commerce, (commerce) => commerce.colors)
    @JoinColumn({name:"commerceId"})
    commerce: Commerce;
    @Column({type: "uuid", nullable:true})
    commerceId:string;
}
