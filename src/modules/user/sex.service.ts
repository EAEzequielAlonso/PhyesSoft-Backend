import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import preloadSex from "../../preloadFiles/sex.json"
import { Sex } from "./entities/sex.entity";


@Injectable()
export class SexService {

    constructor (@InjectRepository(Sex) private sexRepository: Repository<Sex>) {}

    async preloadSexes (): Promise<void> {
        let count:number  = 0
        preloadSex.map (async (dateSex) => {
            const sexFind = await this.sexRepository.findOne({where: {sex: dateSex.sex}})
            if (!sexFind) {
                await this.sexRepository.save(dateSex);
                count++;
            }
        })
        console.log(`Se agregaron ${count} sexos`)
      }
}