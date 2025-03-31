import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService {
  constructor(private readonly repository: BrandRepository) {}

  async findAll(commerceId: string, pageNumber:number,
      limitNumber: number,
      search: string): Promise<[Brand[], number]> {
    try {  
      const response = await this.repository.findAll(commerceId, pageNumber,
        limitNumber,
        search);
      return response
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findCommerce(commerceId:string): Promise<Brand[]> {
    return await this.repository.findCommerce(commerceId);
  }

  async findOne(id: string): Promise<Brand> {
    try {
      const colorFind = await this.repository.findOne(id);
      if (!colorFind) throw new NotFoundException("No se encontro la marca")
      return colorFind;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async create(brand: Partial<Brand>): Promise<Brand> {
    try {
      const res = await this.repository.create(brand);
      if (!res) throw new InternalServerErrorException("No se pudo crear la marca")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, brand: Partial<Brand>) {
    try {
      const res = await this.repository.update(id, brand);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar la marca")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar la marca")
      return res;
    } catch (error) {
      throw new ConflictException(
        'Actualmente la marca esta siendo usada. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando la marca si lo cree necesario. Error: ',error);
    }
  }
}
