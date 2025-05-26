import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { SaleProducts } from 'src/modules/saleProducts/entities/saleProducts.entity';
import { SizeType } from 'src/modules/size-type/entities/size-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sizes' })
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.size)
  saleProducts: SaleProducts[];

  @ManyToOne(() => SizeType, (sizetype) => sizetype.sizes)
  @JoinColumn({ name: 'sizetypeId' })
  sizetype: SizeType;
  @Column({ type: 'uuid', nullable: true })
  sizetypeId: string;

  @ManyToOne(() => Commerce, (commerce) => commerce.sizes)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;
}
