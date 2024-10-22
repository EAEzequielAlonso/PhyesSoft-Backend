import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { SaleProducts } from "src/modules/saleProducts/entities/saleProducts.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"sizes"})
export class Size {

    @PrimaryGeneratedColumn ("uuid")
    id:string

    @Column({ type: 'varchar', length: 20 })
    size:string

    @OneToMany (() => SaleProducts, (saleProduct) => saleProduct.size)
    saleProducts: SaleProducts[];

    // @ManyToOne (() => Commerce, (commerce) => commerce.sizes)
    // @JoinColumn({name:"commerceId"})
    // commerce: Commerce;
    // @Column({type: "uuid", nullable:true})
    // commerceId:string;
}
