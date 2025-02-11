import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  async getBrands(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async getBrandById(id: string): Promise<Brand> {
    return this.brandRepository.findOne({
      where: { id },
      relations: { models: true },
    });
  }

  async createBrand(brand: Partial<Brand>): Promise<Brand> {
    return await this.brandRepository.save(brand);
  }

  async updateBrand(id: string, brand: Partial<Brand>): Promise<UpdateResult> {
    return await this.brandRepository.update(id, brand);
  }

  async deleteBrand(id: string): Promise<DeleteResult> {
    try {
      return await this.brandRepository.delete(id);
    } catch (e) {
      throw new ConflictException(
        'Actualmente la marca fue utilizada. No se puede eliminar  ya que generaria errores. puede probar modificando la marca si lo cree necesario',
      );
    }
  }
}
