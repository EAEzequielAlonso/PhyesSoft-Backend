import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { ProductVariant } from 'src/modules/product-variant/entities/product-variant.entity';
import { SaleProducts } from 'src/modules/saleProducts/entities/saleProducts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'valuevariant' })
export class ValueVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.size)
  saleProducts: SaleProducts[];

  @ManyToOne(() => ProductVariant, (variant) => variant.valuevariants)
  @JoinColumn({ name: 'productvariantId' })
  productvariant: ProductVariant;
  @Column({ type: 'uuid', nullable: true })
  productvariantId: string;

  @ManyToOne (() => Commerce, (commerce) => commerce.sizes)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId:string;

}
