import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './role.entity';
import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
  
  @Entity({
    name: 'users',
  })
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Index()
    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;
  
    @Column({type: 'varchar', length: 50, nullable: true , unique: true})
    email: string;
  
    @Column({ type: 'varchar',
      default: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',})
    imgProfile: string;
  
    @Index()
    @Column({ unique: true })
    dni: number;

    @Column({ nullable: true, unique: true })
    cuit: number;
  
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
    @Index()
    @Column("uuid")
    roleId: string;

    @OneToMany(() => Commerce, (commerce) => commerce.user)
    commerces: Commerce[];
  }
  