import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Color } from "./entities/color.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class ColorRepository {

    constructor (@InjectRepository(Color) private colorRepository: Repository<Color>) {}

    async getColors (): Promise<Color[]> {
        return this.colorRepository.find();
    }

    async getColorById (id:string): Promise<Color> {
        return this.colorRepository.findOne({where: {id}});
    }

    async createColor (color: Partial<Color>): Promise<Color> {
        return await this.colorRepository.save(color);
    }

    async updateColor (id:string, color: Partial<Color>): Promise<UpdateResult> {
        return await this.colorRepository.update(id, color);
    }

    async deleteColor (id:string): Promise<DeleteResult> {
        try {
            return await this.colorRepository.delete(id);
        } catch (e) {
            throw new ConflictException ("Actualmente el color fue utilizado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el color si lo cree necesario");
        }
    }   
}