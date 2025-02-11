import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sex } from './sex.entity';
import { UserRoleCommerce } from './userRoleCommerce.entity';
import { UserRoleBranch } from 'src/modules/branch/entities/userBranch.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    default:
      'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg',
  })
  imgProfile: string;

  @Index()
  @Column({ unique: true })
  dni: number;

  @Column({ nullable: true, unique: true })
  cuit: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  password: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  phone: number;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @ManyToOne(() => Sex, (sex) => sex.users)
  @JoinColumn({ name: 'sexId' })
  sex: Sex;
  @Column({ type: 'uuid', nullable: true })
  sexId: string;

  @OneToMany (() => UserRoleCommerce, (userRoleCommerce) => userRoleCommerce.user)
  userRoleCommerces: UserRoleCommerce[];

  @OneToMany (() => UserRoleBranch, (userRoleBranch) => userRoleBranch.user)
  userRoleBranches: UserRoleBranch[];

}
