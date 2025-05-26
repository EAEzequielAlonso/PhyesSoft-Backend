import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'productPacks' })
export class ProductPack {
  @ManyToOne(() => Product, (product) => product.productpacks)
  @JoinColumn({ name: 'productpackId' })
  productpack: Commerce;
  @PrimaryColumn({ type: 'uuid' })
  productpackId: string;

  @ManyToOne(() => Product, (product) => product.productcomps)
  @JoinColumn({ name: 'productcompId' })
  productcomp: Commerce;
  @PrimaryColumn({ type: 'uuid' })
  productcompId: string;

  @Column('float')
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
