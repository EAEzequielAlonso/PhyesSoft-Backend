import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tax-type")
export class TaxType {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name:string;

}
