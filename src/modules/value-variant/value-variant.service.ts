import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ValueVariantRepository } from './value-variant.repository';
import { ValueVariant } from './entities/value-variant.entity';

@Injectable()
export class ValueVariantService {
  private readonly completeMessage = 'el valor de la variante';

  constructor(private readonly repository: ValueVariantRepository) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[ValueVariant[], number]> {
    return await this.repository.findAll(
      commerceId,
      pageNumber,
      limitNumber,
      search,
    );
  }

  async findByVariant(Id: string): Promise<ValueVariant[]> {
    return this.repository.findByVariant(Id);
  }

  async findOne(id: string): Promise<ValueVariant> {
    const res: ValueVariant = await this.repository.findOne(id);
    if (!res)
      throw new NotFoundException(`No se encontró ${this.completeMessage}`);
    return res;
  }

  async create(body: Partial<ValueVariant>): Promise<ValueVariant> {
    const res: ValueVariant = await this.repository.create(body);
    if (!res)
      throw new InternalServerErrorException(
        `No se pudo crear ${this.completeMessage}`,
      );
    return res;
  }

  async update(id: string, body: Partial<ValueVariant>): Promise<UpdateResult> {
    const res = await this.repository.update(id, body);
    if (res.affected === 0)
      throw new NotFoundException(
        `No se encontro ${this.completeMessage} a actualizar`,
      );
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0)
        throw new NotFoundException(`No se encontro ${this.completeMessage}`);
      return res;
    } catch (e) {
      throw new ConflictException(
        `No se puede eliminar ${this.completeMessage} porque esta relacionado con otra informacion y dejaria inconsistencias. Pruebe modificandolo. `,
      );
    }
  }
}
