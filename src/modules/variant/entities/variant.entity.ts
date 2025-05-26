import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { ValueVariant } from 'src/modules/value-variant/entities/value-variant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'variants' })
export class Variant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => ValueVariant, (value) => value.variant)
  valuevariants: ValueVariant[];

  @OneToMany(() => Product, (product) => product.variant)
  products: Product[];

  @ManyToOne(() => Commerce, (commerce) => commerce.variants)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;
}
