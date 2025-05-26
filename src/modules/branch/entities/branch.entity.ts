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
import { FiscalData } from 'src/modules/fiscal-data/entities/fiscal-data.entity';
import { BoxCash } from 'src/modules/box-cash/entities/box-cash.entity';

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

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'date', nullable: true })
  initDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'boolean', default: false })
  central: boolean;

  @ManyToOne(() => Commerce, (commerce) => commerce.branches)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Index()
  @Column('uuid')
  commerceId: string;

  @OneToMany(() => BoxCash, (boxcash) => boxcash.branch)
  boxesCash: BoxCash[];

  @OneToMany(() => UserRoleBranch, (userRoleBranch) => userRoleBranch.branch)
  userRoleBranches: UserRoleBranch[];

  @ManyToOne(() => FiscalData, (fiscalData) => fiscalData.branches)
  @JoinColumn({ name: 'fiscalDataId' })
  fiscalData: FiscalData;
  @Column('uuid')
  fiscalDataId: string;
}
