import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'branches',
  })
  export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Index()
    @Column({ type: 'varchar', length: 50 })
    address: string;

    @Index()
    @Column({ type: 'varchar', length: 50 })
    city: string;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    emailBranch: string;

    @Column({ type: 'varchar', length: 100, default: "https://img.freepik.com/vector-gratis/apoye-concepto-ilustracion-negocio-local_23-2148587056.jpg" })
    image: string;
  
    @Column({ type: 'date', nullable: true })
    InitDate: Date;
  
    @Column({ type: 'date' })
    startDate: Date;
  
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
  }