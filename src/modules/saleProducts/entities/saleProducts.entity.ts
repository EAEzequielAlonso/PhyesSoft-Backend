import { Color } from 'src/modules/color/entities/color.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'saleProducts' })
export class SaleProducts {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Sale, (sale) => sale.saleProducts)
  @JoinColumn({ name: 'saleId' })
  sale: Sale;
  @Column('uuid')
  saleId: string;

  @ManyToOne(() => Product, (product) => product.saleProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;
  @Column('uuid')
  productId: string;

  @ManyToOne(() => Size, (size) => size.saleProducts)
  @JoinColumn({ name: 'sizeId' })
  size: Size;
  @Column('uuid')
  sizeId: string;

  @ManyToOne(() => Color, (color) => color.saleProducts)
  @JoinColumn({ name: 'colorId' })
  color: Color;
  @Column('uuid')
  colorId: string;

  @Column('float')
  price: number;

  @Column('float')
  discount: number;

  @Column()
  quantity: number;

  @Column('float')
  total: number;
}
