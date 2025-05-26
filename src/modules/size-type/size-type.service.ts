import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SizeType } from './entities/size-type.entity';
import { SizeTypeRepository } from './size-type.repository';

@Injectable()
export class SizeTypeService {
  constructor(private readonly repository: SizeTypeRepository) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[SizeType[], number]> {
    try {
      const response = await this.repository.findAll(
        commerceId,
        pageNumber,
        limitNumber,
        search,
      );
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findCemmerce(commerceId: string): Promise<SizeType[]> {
    try {
      const res = await this.repository.findCommerce(commerceId);
      if (!res)
        throw new NotFoundException('No se encontraron los grupos de Talles');
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<SizeType> {
    try {
      const res = await this.repository.findOne(id);
      if (!res)
        throw new NotFoundException('No se encontro el grupo de Talles');
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(sizeType: Partial<SizeType>): Promise<SizeType> {
    try {
      const res = await this.repository.create(sizeType);
      if (!res)
        throw new InternalServerErrorException(
          'No se pudo crear el grupo de Talles',
        );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, sizeType: Partial<SizeType>) {
    try {
      const res = await this.repository.update(id, sizeType);
      if (res.affected === 0)
        throw new NotFoundException('No se pudo encontrar el grupo de Talles');
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0)
        throw new NotFoundException('No se pudo encontrar el grupo de Talles');
      return res;
    } catch (error) {
      throw new ConflictException(
        'Actualmente el grupo de Talles esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el grupo de Talles si lo cree necesario. Error: ',
        error,
      );
    }
  }
}
