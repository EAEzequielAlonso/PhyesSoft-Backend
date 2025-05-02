import { Branch } from 'src/modules/branch/entities/branch.entity';
import { FiscalData } from 'src/modules/fiscal-data/entities/fiscal-data.entity';
import { EmissionType } from 'src/modules/fiscal-data/Enums/enumsFiscal';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'salesPoints' })
export class SalePoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: EmissionType,
    default : 'ELECTRONICO'
  })
  emissionType: EmissionType;

  @ManyToOne (() => Branch, (branch) => branch.salesPoints)
  @JoinColumn({name:"branchId"})
  branch: Branch;
  @Column({type: "uuid", nullable:true})
  branchId:string;

}