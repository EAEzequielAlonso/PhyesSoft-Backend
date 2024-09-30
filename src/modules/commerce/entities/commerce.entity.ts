import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'commerces',
  })
  export class Commerce {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Index()
    @Column({ type: 'varchar', length: 50 })
    nameFantacy: string;

    @Index()
    @Column({ type: 'varchar', length: 50 })
    nameCompany: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    slogan: string;
  
    @Column({ type: 'varchar',
        default: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',})
    imgLogo: string;
  
    @Column({ type: 'varchar',
      default: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',})
    imgBanner: string;
  
    @Column({ type: 'varchar', length: 50, unique: true })
    emailCompany: string;
  
    @Column({ type: 'date', nullable: true })
    InitDate: Date;
  
    @Column({ type: 'date' })
    startDate: Date;
  
    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @ManyToOne(() => User, (user) => user.commerces)
    @JoinColumn({name: "userId"})
    user: User;
    @Index()
    @Column("uuid")
    userId: string;
  }