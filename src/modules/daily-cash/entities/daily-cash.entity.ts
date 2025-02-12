import { Branch } from 'src/modules/branch/entities/branch.entity';
import { CashMovement } from 'src/modules/cash-movement/entities/cash-movement.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'dailyCash' })
export class DailyCash {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  dateInit: Date;

  @Column('date')
  dateFinish: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  cash: number; // Efectivo

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  transfer: number; // Transferencias

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  card: number; // Pagos con tarjeta

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  discount: number; // Monto total de descuentos aplicados

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  expenses: number; // Monto total de gastos

  @Column({ type: 'int', default: 0 })
  cashCount: number; // Cantidad de ventas en efectivo

  @Column({ type: 'int', default: 0 })
  transferCount: number; // Cantidad de ventas por transferencia

  @Column({ type: 'int', default: 0 })
  cardCount: number; // Cantidad de ventas con tarjeta

  @Column({ type: 'int', default: 0 })
  expensesCount: number; // Número de transacciones de gastos

  @Column({ type: 'int', default: 0 })
  discountCount: number; // Número de ventas con descuento
  
  @OneToMany(() => Sale, (sale) => sale.dailyCash)
  sales: Sale[];

  @OneToMany(() => CashMovement, (cashMovement) => cashMovement.dailyCash)
  cashMovements: CashMovement[];

  // relacion para saber quien abrio la caja.
  @ManyToOne (() => User, (user) => user.dailyCash)
  @JoinColumn({name:"userIdOpen"})
  userOpen: User;
  @Column('uuid')
  userIdOpen: string;
 
  //relacion para saber de que sucursal es la caja
  @ManyToOne (() => Branch, (branch) => branch.dailyCash)
  @JoinColumn({name:"branchId"})
  branch: Branch;
  @Column({type: "uuid", nullable:true})
  branchId:string;
}
