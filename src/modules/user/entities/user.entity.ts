import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { UserRole } from './role.entity';
  
  @Entity({
    name: 'users',
  })
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Index()
    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;
  
    @Column({type: 'varchar', length: 50, nullable: true })
    email: string;
  
    @Column({ type: 'varchar',
      default: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',})
    imgProfile: string;
  
    @Index()
    @Column({ nullable: true, unique: true })
    dni: number;
  
    @Column({ type: 'varchar', length: 128, nullable: true })
    password: string;
  
    @Column({ type: 'date', nullable: true })
    birthDate: Date;
  
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

    @ManyToOne(() => UserRole, (userRole) => userRole.users)
    @JoinColumn({name: "userRoleId"})
    role: UserRole;
    @Column("uuid")
    userRoleId: string;
  }
  