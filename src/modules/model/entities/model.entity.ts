import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'models' })
export class Model {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  model: string;

  @OneToMany(() => Product, (product) => product.model)
  products: Product[];

  @ManyToOne(() => Brand, (brand) => brand.models)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;
  @Column({ type: 'uuid', nullable: true })
  brandId: string;
}
