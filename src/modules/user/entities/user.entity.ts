import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoleBranch } from 'src/modules/branch/entities/userBranch.entity';
import { DailyCash } from 'src/modules/daily-cash/entities/daily-cash.entity';
import { UserRole } from './role.entity';
import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { CashMovement } from 'src/modules/cash-movement/entities/cash-movement.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    default:
      'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg',
  })
  imgProfile: string;

  @Column({ unique: true, nullable: true })
  dni: number;

  @Column({ nullable: true, unique: true })
  cuit: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  password: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  phone: number;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @ManyToOne(() => UserRole, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: UserRole;
  @Column({ type: 'uuid', nullable: true })
  roleId: string;

  @OneToMany(() => UserRoleBranch, (userRoleBranch) => userRoleBranch.user)
  userRoleBranches: UserRoleBranch[];

  @OneToMany(() => DailyCash, (dailyCash) => dailyCash.userOpen)
  dailyCash: DailyCash[];

  @OneToOne(() => Commerce, (commerce) => commerce.user)
  commerce: Commerce;

  @OneToOne(() => CashMovement, (mov) => mov.userCreateMov)
  cashMovements: CashMovement[];
}
