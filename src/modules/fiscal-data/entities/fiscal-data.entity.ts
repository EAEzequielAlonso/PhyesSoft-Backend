import { Branch } from 'src/modules/branch/entities/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConditionIVA, TicketType } from '../Enums/enumsFiscal';
import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { SalePoint } from 'src/modules/sale-point/entities/sales-point.entity';

@Entity({ name: 'fiscalData' })
export class FiscalData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 11 })
  cuit: string;

  @Column({ type: 'enum', enum: ConditionIVA })
  conditionIva: ConditionIVA;

  @Column({ length: 200 })
  addressCommerce: string;

  @Column({ type: 'date' })
  initActivity: Date;

  @Column({ length: 20 })
  ingresosBrutos: string;

  @Column({ type: 'enum', enum: TicketType })
  ticketType: TicketType;

  @Column({ length: 100, nullable: true })
  aliasFacturacion?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Commerce, (commerce) => commerce.fiscalData)
  @JoinColumn({ name: 'commerceId' })
  commerce: Commerce;
  @Column({ type: 'uuid', nullable: true })
  commerceId: string;

  @OneToMany(() => Branch, (branch) => branch.fiscalData)
  branches: Branch[];

  @OneToMany(() => SalePoint, (salePoint) => salePoint.fiscalData)
  salePoints: SalePoint[];
}
