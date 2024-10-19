import { Commerce } from "src/modules/commerce/entities/commerce.entity";
import { Model } from "src/modules/model/entities/model.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:"brands"
})
export class Brand {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar")
    brand: string

    @OneToMany (() => Model, (model) => model.brand)
    models: Model[];

    @ManyToOne (() => Commerce, (commerce) => commerce.brands)
    @JoinColumn({name:"commerceId"})
    commerce: Commerce;
    @Column({type: "uuid", nullable:true})
    commerceId:string;
}