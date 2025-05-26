import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"providers"})
export class Provider {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name: String;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Commerce, (commerce) => commerce.providers)
    @JoinColumn({ name: 'commerceId' })
    commerce: Commerce;
    @Column({ type: 'uuid', nullable: true })
    commerceId: string;

    @OneToMany(() => Product, (product) => product.producttype)
    products: Product[];

}
