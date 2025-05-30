import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from './entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ModelRepository {
  constructor(
    @InjectRepository(Model) private modelRepository: Repository<Model>,
  ) {}

  async getModels(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[Model[], number]> {
    return this.modelRepository.findAndCount({
      where: { name: ILike(`%${search}%`), brand: { commerceId } },
      order: { createdAt: 'DESC' },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      relations: { brand: true },
    });
  }

  async getModelCommerce(commerceId: string): Promise<Model[]> {
    return await this.modelRepository.find({
      where: { brand: { commerceId } },
    });
  }

  async getModelsByBrand(brandId: string): Promise<Model[]> {
    return this.modelRepository.find({ where: { brandId } });
  }

  async getModelById(id: string): Promise<Model> {
    return this.modelRepository.findOne({
      where: { id },
      relations: { brand: true },
    });
  }

  async createModel(model: Partial<Model>): Promise<Model> {
    return await this.modelRepository.save(model);
  }

  async updateModel(id: string, model: Partial<Model>): Promise<UpdateResult> {
    return await this.modelRepository.update(id, model);
  }

  async deleteModel(id: string): Promise<DeleteResult> {
    try {
      return await this.modelRepository.delete(id);
    } catch (e) {
      throw new ConflictException(
        'Actualmente el modelo esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el modelo si lo cree necesario',
      );
    }
  }
}
