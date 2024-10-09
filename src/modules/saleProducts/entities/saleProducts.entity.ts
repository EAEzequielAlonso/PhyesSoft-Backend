import { Product } from "src/modules/product/entities/product.entity";
import { Sale } from "src/modules/sale/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:"saleProducts"})
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

    @Column("float")
    price: number

    @Column("float")
    discount: number

    @Column()
    quantity: number

    @Column("float")
    total: number
}
