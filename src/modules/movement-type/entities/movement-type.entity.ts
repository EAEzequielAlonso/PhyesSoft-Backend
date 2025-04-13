import { CashMovement } from "src/modules/cash-movement/entities/cash-movement.entity";
import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('movementTypes')
export class MovementType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string; // Ejemplo: 'Electricity', 'Rent'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne (() => Commerce, (commerce) => commerce.movementTypes)
  @JoinColumn({name:"commerceId"})
  commerce: Commerce;
  @Column({type: "uuid", nullable:true})
  commerceId:string;

  @OneToMany(() => CashMovement, (cashMovement) => cashMovement.movementType)
  cashMovements: CashMovement[];
}
