import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("taxes")
export class Tax {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    name:string;

    @Column("float")
    alicuota: number;

    @Column("uuid")
    taxtype: string;

    @Column("uuid")
    taxapplication: string;
}
