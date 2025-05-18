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
import { ProductVariant } from 'src/modules/product-variant/entities/product-variant.entity';
import { ProductPack } from 'src/modules/product-pack/entities/product-pack.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({type: 'varchar', nullable:true})
  codbar: string;

  @Column({type:"varchar", default:"https://svgsilh.com/svg_v2/484372.svg"})
  image: string;

  @Column({type: 'int', default: 1})
  buyUnit: number;

  @Column({type: 'int', default: 1})
  saleUnit: number;

  @Column({type: 'boolean', default: false})
  sizeColor: boolean;

  @Column({type: 'boolean', default: false})
  isPackComp: boolean;

  @Column({type: 'boolean', default: true})
  isSellable: boolean;

  @Column({type: 'boolean', default: false})
  isRawMaterial: boolean;

  @Column('float')
  cost: number;

  @Column('float')
  profit: number;

  @Column('float')
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

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

  @ManyToOne (() => SizeType, (sizetype) => sizetype.products)
  @JoinColumn({name:"sizetypeId"})
  sizetype: SizeType;
  @Column({type: "uuid", nullable:true})
  sizetypeId: string;

  @ManyToOne (() => ProductVariant, (variant) => variant.products)
  @JoinColumn({name:"productvariantId"})
  productvariant: ProductVariant;
  @Column({type: "uuid", nullable:true})
  productvariantId: string;

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.product)
  saleProducts: SaleProducts[];

  @OneToMany(() => ProductPack, (productPack) => productPack.productpack)
  productpacks: ProductPack[];

  @OneToMany(() => ProductPack, (productComp) => productComp.productcomp)
  productcomps: ProductPack[];

}
