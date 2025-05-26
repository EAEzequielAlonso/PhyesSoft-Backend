import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("iva")
export class Iva {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column("varchar")
    name:string;

    @Column("float")
    alicuota: number

    @OneToMany(() => Product, (product) => product.ivaSale)
    productsSale: Product[];

    @OneToMany(() => Product, (product) => product.ivaBuy)
    productsBuy: Product[];
}
