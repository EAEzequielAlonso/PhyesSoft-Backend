import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Variant } from 'src/modules/variant/entities/variant.entity';
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

  @ManyToOne(() => Variant, (variant) => variant.valuevariants)
  @JoinColumn({ name: 'variantId' })
  variant: Variant;
  @Column({ type: 'uuid', nullable: true })
  variantId: string;

  @ManyToOne(() => Commerce, (commerce) => commerce.sizes)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;
}
