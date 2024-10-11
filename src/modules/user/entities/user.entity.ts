import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './role.entity';
import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { Sex } from './sex.entity';
import { Sale } from 'src/modules/sale/entities/sale.entity';
  
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
      default: 'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg',})
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
    @Column({type: "uuid", nullable:true})
    roleId: string;

    @ManyToOne(() => Sex, (sex) => sex.users)
    @JoinColumn({name: "sexId"})
    sex: Sex;
    @Column({type: "uuid", nullable:true})
    sexId: string;

    @OneToMany(() => Commerce, (commerce) => commerce.user)
    commerces: Commerce[];

    @OneToMany(() => Sale, (sale) => sale.client)
    sales: Sale[];
  }
  