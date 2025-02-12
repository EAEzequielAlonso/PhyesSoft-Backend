import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoleBranch } from './userBranch.entity';
import { DailyCash } from 'src/modules/daily-cash/entities/daily-cash.entity';

@Entity({
  name: 'branches',
})
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  emailBranch: string;

  @Column({
    type: 'varchar',
    length: 100,
    default:
      'https://img.freepik.com/vector-gratis/apoye-concepto-ilustracion-negocio-local_23-2148587056.jpg',
  })
  image: string;

  @Column({ type: 'date', nullable: true })
  InitDate: Date;

  @Column({ type: 'date' })
  createAt: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'boolean' })
  central: boolean;

  @ManyToOne(() => Commerce, (commerce) => commerce.branches)
  @JoinColumn({name: "commerceId"})
  commerce: Commerce;
  @Index()
  @Column("uuid")
  commerceId: string;

  @OneToMany (() => UserRoleBranch, (userRoleBranch) => userRoleBranch.branch)
  userRoleBranches: UserRoleBranch[];

  @OneToMany (() => DailyCash, (dailyCash) => dailyCash.branch)
  dailyCash: DailyCash[];
}
