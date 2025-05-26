import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { VariantRepository } from './variant.repository';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantService {
  private readonly completeMessage = 'la variante de producto';

  constructor(private readonly repository: VariantRepository) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[Variant[], number]> {
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

  async findCemmerce(commerceId: string): Promise<Variant[]> {
    try {
      const res = await this.repository.findCommerce(commerceId);
      if (!res)
        throw new NotFoundException(`No se encontro ${this.completeMessage}`);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Variant> {
    try {
      const res = await this.repository.findOne(id);
      if (!res)
        throw new NotFoundException(`No se encontro ${this.completeMessage}`);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(body: Partial<Variant>): Promise<Variant> {
    try {
      const res = await this.repository.create(body);
      if (!res)
        throw new InternalServerErrorException(
          `No se pudo crear ${this.completeMessage}`,
        );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, body: Partial<Variant>) {
    try {
      const res = await this.repository.update(id, body);
      if (res.affected === 0)
        throw new NotFoundException(
          `No se pudo encontrar ${this.completeMessage}`,
        );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0)
        throw new NotFoundException(
          `No se pudo encontrar ${this.completeMessage}`,
        );
      return res;
    } catch (error) {
      throw new ConflictException(
        `Actualmente ${this.completeMessage} esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando ${this.completeMessage} si lo cree necesario. Error: `,
        error,
      );
    }
  }
}
