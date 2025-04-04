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

@Entity({ name: 'colors' })
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; 

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.color)
  saleProducts: SaleProducts[];

  @ManyToOne (() => Commerce, (commerce) => commerce.colors)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId:string;

}
