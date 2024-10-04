import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Sale } from "./sale.entity";
import { Product } from "src/modules/product/entities/product.entity";

@Entity({
    name:"saleProducts"
})
export class SaleProducts {

    @ManyToOne(() => Sale, (sale) => sale.saleProducts)
    @JoinColumn({name: "saleId"})
    sale: Sale
    @PrimaryColumn("uuid")
    saleId: string

    @ManyToOne(() => Product, (product) => product.saleProducts)
    @JoinColumn({name: "productId"})
    product: Product
    @PrimaryColumn("uuid")
    productId: string

    @Column("int")
    quantity:number;

    @Column("float")
    price:number;

    @Column("float")
    discount:number;

    @Column("float")
    total:number;

}
