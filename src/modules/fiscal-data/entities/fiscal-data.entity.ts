import { Branch } from "src/modules/branch/entities/branch.entity";
import { SalePoint } from "src/modules/sale-point/entities/sales-point.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum CondicionIVA {
    ResponsableInscripto = 'Responsable Inscripto',
    Monotributo        = 'Monotributo',
    Exento             = 'Exento',
    ConsumidorFinal    = 'Consumidor Final',
  }

export enum TipoComprobante {
    A = 'A',
    B = 'B',
    C = 'C',
    M = 'M',
  }

@Entity({ name: 'fiscalData' })
export class FiscalData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  razonSocial: string;

  @Column({ length: 20, unique: true })
  cuit: string;

  @Column({ type: 'enum', enum: CondicionIVA })
  condicionIva: CondicionIVA;

  @Column({ length: 200 })
  addressCommerce: string;

  @Column({ type: 'date' })
  initActivity: Date;

  @Column({ length: 20 })
  ingresosBrutos: string;

  @Column({ type: 'enum', enum: TipoComprobante })
  ticketType: TipoComprobante;

  @Column({ length: 100, nullable: true })
  aliasFacturacion?: string;

  @OneToMany(() => Branch, branch => branch.fiscalData)
  branches: Branch[];

  @OneToMany(() => SalePoint, salepoint => salepoint.fiscalData)
  salesPoint: SalePoint[];
}
