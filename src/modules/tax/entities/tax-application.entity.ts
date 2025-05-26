import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tax-application")
export class TaxApplication {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name:string;

}
