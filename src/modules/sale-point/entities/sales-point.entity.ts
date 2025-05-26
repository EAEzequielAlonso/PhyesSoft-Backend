import { BoxCash } from 'src/modules/box-cash/entities/box-cash.entity';
import { FiscalData } from 'src/modules/fiscal-data/entities/fiscal-data.entity';
import { EmissionType } from 'src/modules/fiscal-data/Enums/enumsFiscal';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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
    default: 'ELECTRONICO',
  })
  emissionType: EmissionType;

  @OneToOne(() => BoxCash, (boxCash) => boxCash.salePoint)
  boxCash: BoxCash; // Relación con la caja

  @ManyToOne(() => FiscalData, (fiscalData) => fiscalData.salePoints)
  @JoinColumn({ name: 'fiscalDataId' })
  fiscalData: FiscalData;
  @Column({ type: 'uuid', nullable: true })
  fiscalDataId: string;
}
