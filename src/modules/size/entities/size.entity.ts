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

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.size)
  saleProducts: SaleProducts[];

  @ManyToOne(() => SizeType, (sizeType) => sizeType.sizes)
  @JoinColumn({ name: 'sizeTypeId' })
  sizeType: SizeType;
  @Column({ type: 'uuid', nullable: true })
  sizeTypeId: string;

  @ManyToOne (() => Commerce, (commerce) => commerce.sizes)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId:string;

}
