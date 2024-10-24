import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Size } from "./entities/size.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class SizeRepository {

    constructor (@InjectRepository(Size) private sizeRepository: Repository<Size>) {}

    async getSizes (): Promise<Size[]> {
        return this.sizeRepository.find();
    }

    async getSizeById (id:string): Promise<Size> {
        return this.sizeRepository.findOne({where: {id}});
    }

    async createSize (size: Partial<Size>): Promise<Size> {
        return await this.sizeRepository.save(size);
    }

    async updateSize (id:string, size: Partial<Size>): Promise<UpdateResult> {
        return await this.sizeRepository.update(id, size);
    }

    async deleteSize (id:string): Promise<DeleteResult> {
        try {
            return await this.sizeRepository.delete(id);
        } catch (e) {
            throw new ConflictException ("Actualmente el talle fue utilizado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el talle si lo cree necesario");
        }
    }   
}