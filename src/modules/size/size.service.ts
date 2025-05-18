import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException, 
} from '@nestjs/common';
import { SizeRepository } from './size.repository';
import { Size } from './entities/size.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class SizeService {
  constructor(private readonly repository: SizeRepository) {}
 
  async findAll(commerceId: string, pageNumber:number,
      limitNumber: number,
      search: string): Promise<[Size[], number]> {
      return await this.repository.findAll(commerceId, pageNumber,
        limitNumber,
        search);
    }

  async findByCategory(sizeTypeId: string): Promise<Size[]> {
    return this.repository.findByCategory(sizeTypeId);
  }

  async findOne(id: string): Promise<Size> {
    const res: Size =
      await this.repository.findOne(id);
    if (!res) throw new NotFoundException('Talle no encontrada');
    return res;
  }

  async create(size: Partial<Size>): Promise<Size> {
    const res: Size = await this.repository.create(size);
    if (!res) throw new InternalServerErrorException(
        'No se pudo crear el talle',
      );
    return res;
  }

  async update(
    id: string,
    size: Partial<Size>,
  ): Promise<UpdateResult> {
    const res =
      await this.repository.update(id, size);
    if (res.affected === 0)
      throw new NotFoundException(
        'No se encontro el talle a actualizar',
      );
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
    const res = await this.repository.remove(id);
    if (res.affected === 0)
      throw new NotFoundException(
        'No se encontro el talle',
      );
    return res;
    } catch (e) {
      throw new ConflictException(`No se puede eliminar el talle porque esta relacionado con otra informacion y dejaria inconsistencias. Pruebe modificandolo. `)
    }
  }
}
