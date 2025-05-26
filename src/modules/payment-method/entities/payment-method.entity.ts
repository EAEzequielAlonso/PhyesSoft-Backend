import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { PaymentSale } from 'src/modules/payment-sales/entities/payment-sale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'paymentMethods' })
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  adjustment: number; // Valor de ajuste (positivo para recargo, negativo para descuento)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Commerce, (commerce) => commerce.paymentMethods)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;

  @OneToMany(() => PaymentSale, (paymentSale) => paymentSale.paymentMethod)
  paymentSales: PaymentSale[];
}
