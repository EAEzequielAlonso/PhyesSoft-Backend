import { Model } from 'src/modules/model/entities/model.entity';
import { SaleProducts } from '../../saleProducts/entities/saleProducts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subcategory } from 'src/modules/subcategory/entities/subcategory.entity';
import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { SizeType } from 'src/modules/size-type/entities/size-type.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('float')
  cost: number;

  @Column('float')
  profit: number;

  @Column('float')
  price: number;

  @Column('date')
  createAt: Date;

  @Column({type: 'date', nullable:true})
  endDate: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'subcategoryId' })
  subcategory: Subcategory;
  @Column({ type: 'uuid', nullable: true })
  subcategoryId: string;

  @ManyToOne(() => Model, (model) => model.products)
  @JoinColumn({ name: 'modelId' })
  model: Model;
  @Column({ type: 'uuid', nullable: true })
  modelId: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;
  @Column({ type: 'uuid', nullable: true })
  brandId: string;

  @ManyToOne (() => Commerce, (commerce) => commerce.products)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId: string;

  @ManyToOne (() => SizeType, (sizeType) => sizeType.products)
  @JoinColumn({name:"sizeTypeId"})
  sizeType: SizeType;
  @Column({type: "uuid", nullable:true})
  sizeTypeId: string;

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.product)
  saleProducts: SaleProducts[];

}
