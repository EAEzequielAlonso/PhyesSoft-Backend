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
import { Variant } from 'src/modules/variant/entities/variant.entity';
import { ProductPack } from 'src/modules/product-pack/entities/product-pack.entity';
import { Iva } from 'src/modules/iva/entities/iva.entity';
import { Provider } from 'src/modules/provider/entities/provider.entity';
import { ProductType } from './product-type.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({type: 'varchar', nullable: true})
  code: string;

  @Column({type: 'varchar', nullable: true})
  description: string;

  @Column({ type: 'varchar', default: 'https://svgsilh.com/svg_v2/484372.svg' })
  image: string;

  @Column({ type: 'int', default: 1 })
  buyUnit: number;

  @Column({ type: 'int', default: 1 })
  saleUnit: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  hasColor: boolean;

  @Column({ type: 'boolean', default: false })
  isPackComp: boolean;

  @Column({ type: 'boolean', default: true })
  isSellable: boolean;

  @Column({ type: 'boolean', default: true }) 
  isBuyable: boolean;

  @Column({ type: 'boolean', default: false })
  isInsumo: boolean;

  @Column({ type: 'boolean', default: false })
  isRawMaterial: boolean;

  @Column({type: 'float', nullable: true})
  cost: number;

  @Column({type: 'float', nullable: true})
  profit: number;

  @Column({type: 'float', nullable: true})
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;



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

  @ManyToOne(() => Commerce, (commerce) => commerce.products)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;

  @ManyToOne(() => SizeType, (sizetype) => sizetype.products)
  @JoinColumn({ name: 'sizetypeId' })
  sizetype: SizeType;
  @Column({ type: 'uuid', nullable: true })
  sizetypeId: string;

  @ManyToOne(() => Variant, (variant) => variant.products)
  @JoinColumn({ name: 'variantId' })
  variant: Variant;
  @Column({ type: 'uuid', nullable: true })
  variantId: string;

  @ManyToOne(() => Iva, (iva) => iva.productsSale)
  @JoinColumn({ name: 'ivaSaleId' })
  ivaSale: Iva;
  @Column({ type: 'uuid', nullable: true })
  ivaSaleId: string;

  @ManyToOne(() => Iva, (iva) => iva.productsBuy)
  @JoinColumn({ name: 'ivaBuyId' })
  ivaBuy: Iva;
  @Column({ type: 'uuid', nullable: true })
  ivaBuyId: string;

  @ManyToOne(() => ProductType, (producttype) => producttype.products)
  @JoinColumn({ name: 'producttypeId' })
  producttype: ProductType;
  @Column({ type: 'uuid', nullable: true })
  producttypeId: string;

  @ManyToOne(() => Provider, (provider) => provider.products)
  @JoinColumn({ name: 'providerId' })
  provider: Provider;
  @Column({ type: 'uuid', nullable: true })
  providerId: string;

  

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.product)
  saleProducts: SaleProducts[];

  @OneToMany(() => ProductPack, (productPack) => productPack.productpack)
  productpacks: ProductPack[];

  @OneToMany(() => ProductPack, (productComp) => productComp.productcomp)
  productcomps: ProductPack[];
}
