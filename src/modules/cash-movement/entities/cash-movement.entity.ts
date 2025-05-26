import { DailyCash } from 'src/modules/daily-cash/entities/daily-cash.entity';
import { MovementType } from 'src/modules/movement-type/entities/movement-type.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cashMovements')
export class CashMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.cashMovements)
  @JoinColumn({ name: 'userCreateMovId' })
  userCreateMov: User;
  @Column('uuid')
  userCreateMovId: string;

  @ManyToOne(() => DailyCash, (dailyCash) => dailyCash.cashMovements)
  @JoinColumn({ name: 'dailyCashId' })
  dailyCash: DailyCash;
  @Column('uuid')
  dailyCashId: string;

  @ManyToOne(() => MovementType, (movementType) => movementType.cashMovements, {
    nullable: true,
  })
  @JoinColumn({ name: 'movementTypeId' })
  movementType: MovementType;
  @Column('uuid')
  movementTypeId: string;

  @Column('text', { nullable: true })
  description: string;
}
