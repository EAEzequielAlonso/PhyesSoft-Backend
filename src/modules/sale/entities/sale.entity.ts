import { DailyCash } from 'src/modules/daily-cash/entities/daily-cash.entity';
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
import { PaymentSale } from 'src/modules/payment-sales/entities/payment-sale.entity';

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

  @ManyToOne(() => DailyCash, (dailyCash) => dailyCash.sales)
  @JoinColumn({ name: 'dailyCashId' })
  dailyCash: DailyCash;
  @Column('uuid')
  dailyCashId: string;

  @OneToMany(() => SaleProducts, (saleProducts) => saleProducts.sale)
  saleProducts: SaleProducts[];

  @OneToMany(() => PaymentSale, (paymentSale) => paymentSale.sale)
  paymentSales: PaymentSale[];
}
