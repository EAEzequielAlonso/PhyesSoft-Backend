import { Branch } from "src/modules/branch/entities/branch.entity";
import { DailyCash } from "src/modules/daily-cash/entities/daily-cash.entity";
import { SalePoint } from "src/modules/sale-point/entities/sales-point.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('box_cashes')
export class BoxCash {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nombre de la caja

  @ManyToOne(() => Branch, branch => branch.boxesCash)
  @JoinColumn({ name: 'branchId' })
  branch: Branch; // Relación con la sucursal
  @Column("uuid")
  branchId:string

  @OneToOne(() => SalePoint, { eager: true }) // Relación One-to-One con el punto de venta
  @JoinColumn({ name: 'salePointId' })
  @Index({ unique: true }) // Asegura que no haya dos cajas con el mismo punto de venta
  salePoint: SalePoint; // Punto de venta
  @Column({ type:"uuid", nullable:true})
  salePointId:string;

  @OneToMany(() => DailyCash, (dailyCash) => dailyCash.boxCash)
  dailyCashes: DailyCash[];

  @Column({ default: true })
  active: boolean; // Indica si la caja está activa

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
