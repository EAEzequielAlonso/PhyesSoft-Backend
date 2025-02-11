import { Branch } from '../../branch/entities/branch.entity';
import { SaleProducts } from '../../saleProducts/entities/saleProducts.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'sales',
})
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  numSale: number;

  @Column('date')
  date: Date;

  @Column('float')
  subtotal: number;

  @Column('float')
  discount: number;

  @Column('float')
  total: number;

  // @ManyToOne(() => CajaVenta, (cajaVenta) => cajaVenta.sales)
  // @JoinColumn({name: "cajaVentaId"})
  // cajaVenta : CajaVenta;
  // @Column("uuid")
  // cajaVentaId: string

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.sale)
  saleProducts: SaleProducts;
}
