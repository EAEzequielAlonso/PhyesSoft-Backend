import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { User } from './user.entity';
  
  @Entity({
    name: 'roles',
  })
  export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    role: string;
  
    @OneToMany(() => User, (user) => user.role)
    users: User[];
  }
  