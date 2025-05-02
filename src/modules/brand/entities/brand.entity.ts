import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { FiscalData } from 'src/modules/fiscal-data/entities/fiscal-data.entity';
import { Model } from 'src/modules/model/entities/model.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'brands',
})
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar') 
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @ManyToOne (() => Commerce, (commerce) => commerce.brands)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId:string;
}
