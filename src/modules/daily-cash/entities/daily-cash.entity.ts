import { BoxCash } from 'src/modules/box-cash/entities/box-cash.entity';
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({type:"boolean", default:true})
  isOpen: boolean;

  @Column({type:'date', nullable:true})
  finishedAt: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  initCash: number; // Efectivo

  // relacion para saber quien abrio la caja.
  @ManyToOne (() => User, (user) => user.dailyCash)
  @JoinColumn({name:"userOpenId"})
  userOpen: User;
  @Column('uuid')
  userOpenId: string;
 
  //relacion para saber de que sucursal es la caja
  @ManyToOne (() => BoxCash, (boxCash) => boxCash.dailyCashes)
  @JoinColumn({name:"boxCashId"})
  boxCash: BoxCash;
  @Column({type: "uuid"})
  boxCashId:string


  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  cash: number; // Efectivo

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  transfer: number; // Transferencias

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  card: number; // Pagos con tarjeta

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  discount: number; // Monto total de descuentos aplicados

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  movements: number; // Monto total de gastos

  @Column({ type: 'int', default: 0 })
  cashCount: number; // Cantidad de ventas en efectivo

  @Column({ type: 'int', default: 0 })
  transferCount: number; // Cantidad de ventas por transferencia

  @Column({ type: 'int', default: 0 })
  cardCount: number; // Cantidad de ventas con tarjeta

  @Column({ type: 'int', default: 0 })
  movementCount: number; // Número de transacciones de gastos

  @Column({ type: 'int', default: 0 })
  discountCount: number; // Número de ventas con descuento
  
  
  @OneToMany(() => Sale, (sale) => sale.dailyCash)
  sales: Sale[]; 

  @OneToMany(() => CashMovement, (cashMovement) => cashMovement.dailyCash)
  cashMovements: CashMovement[];

  ;
}
