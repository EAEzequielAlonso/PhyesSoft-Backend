import { Branch } from "src/modules/branch/entities/branch.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "sales"
})
export class Sale {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable:true, unique:true})
    numSale:number

    @Column("date")
    date: Date;

    @Column("float")
    subtotal: number

    @Column("float")
    discount: number

    @Column("float")
    total: number

    @ManyToOne(() => Branch, (branch) => branch.sales)
    @JoinColumn({name: "branchId"})
    branch : Branch;
    @Column("uuid")
    branchId: string

    @ManyToOne(() => User, (user) => user.sales)
    @JoinColumn({name: "clientId"})
    client : User
    @Column("uuid")
    clientId: string
}
