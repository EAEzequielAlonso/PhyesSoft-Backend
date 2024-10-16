import { Model } from "src/modules/model/entities/model.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

}