
import { SaleProducts } from "src/modules/saleProducts/entities/saleProducts.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"colors"})
export class Color {

    @PrimaryGeneratedColumn ("uuid")
    id:string

    @Column({ type: 'varchar', length: 40 })
    color:string

    @OneToMany (() => SaleProducts, (saleProduct) => saleProduct.color)
    saleProducts: SaleProducts[];

}
