import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sizeTypes' })
export class SizeType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => Size, (size) => size.sizeType)
  sizes: Size[];

  @OneToMany(() => Product, (product) => product.sizeType)
  products: Product[];

  @ManyToOne (() => Commerce, (commerce) => commerce.sizeTypes)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId:string;

}