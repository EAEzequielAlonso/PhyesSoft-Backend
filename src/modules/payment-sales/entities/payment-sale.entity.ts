import { PaymentMethod } from 'src/modules/payment-method/entities/payment-method.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentSale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.paymentSales)
  @JoinColumn({ name: 'saleId' })
  sale: Sale;
  @Column({ type: 'uuid' })
  saleId: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.paymentSales)
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;
  @Column({ type: 'uuid' })
  paymentMethodId: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number; // Monto original pagado con este método

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  adjustedAmount: number; // Monto final después del ajuste (recargo/descuento)
}
