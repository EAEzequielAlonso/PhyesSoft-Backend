import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ModelRepository } from './model.repository';
import { Model } from './entities/model.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}

  async getModels(commerceId: string, pageNumber:number,
        limitNumber: number,
        name: string,
        optionId: string,
        sortField: string,
        sortOrder: string): Promise<[Model[], number]> {
        return this.modelRepository.getModels(commerceId, pageNumber,
          limitNumber,
          name,
          optionId,
          sortField,
          sortOrder);
      }
  
  async getModelCommerce(commerceId:string): Promise<Model[]> {
    return await this.modelRepository.getModelCommerce(commerceId);
  }

  async getModelsByBrand(brandId: string): Promise<Model[]> {
    return this.modelRepository.getModelsByBrand(brandId);
  }

  async getModelById(id: string): Promise<Model> {
    const modelo: Model = await this.modelRepository.getModelById(id);
    if (!modelo) throw new NotFoundException('Modelo no encontrada');
    return modelo;
  }

  async createModel(model: Partial<Model>): Promise<Model> {
    const modeloCreate: Model = await this.modelRepository.createModel(model);
    if (!modeloCreate)
      throw new InternalServerErrorException('No se pudo crear el modelo');
    return modeloCreate;
  }

  async updateModel(id: string, model: Partial<Model>): Promise<UpdateResult> {
    const res = await this.modelRepository.updateModel(id, model);
    if (res.affected === 0)
      throw new NotFoundException('No se encontro el modelo a actualizar');
    return res;
  }

  async deleteModel(id: string): Promise<Model> {
    const modelo = await this.modelRepository.getModelById(id);
    if (!modelo)
      throw new NotFoundException('No se encontro el modelo a eliminar');
    await this.modelRepository.deleteModel(id);
    return modelo;
  }
}
