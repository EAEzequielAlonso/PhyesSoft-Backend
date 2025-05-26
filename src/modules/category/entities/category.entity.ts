import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Subcategory } from 'src/modules/subcategory/entities/subcategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(() => Product, (products) => products.category)
  products: Product[];

  @ManyToOne(() => Commerce, (commerce) => commerce.categories)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;
}
