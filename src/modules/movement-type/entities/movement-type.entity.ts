import { CashMovement } from "src/modules/cash-movement/entities/cash-movement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('movementTypes')
export class MovementType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Ejemplo: 'Electricity', 'Rent'

  @OneToMany(() => CashMovement, (cashMovement) => cashMovement.movementType)
  cashMovements: CashMovement[];
}
