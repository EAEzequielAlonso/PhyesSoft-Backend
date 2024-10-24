import { Color } from "src/modules/color/entities/color.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Sale } from "src/modules/sale/entities/sale.entity";
import { Size } from "src/modules/size/entities/size.entity";
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

    @ManyToOne(() => Size, (size) => size.saleProducts)
    @JoinColumn({name: "sizeId"})
    size: Size
    @PrimaryColumn("uuid")
    sizeId: string

    @ManyToOne(() => Color, (color) => color.saleProducts)
    @JoinColumn({name: "colorId"})
    color: Color
    @PrimaryColumn("uuid")
    colorId: string

    @Column("float")
    price: number

    @Column("float")
    discount: number

    @Column()
    quantity: number

    @Column("float")
    total: number

}
