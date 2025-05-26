import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductPackRepository } from './product-pack.repository';
import { ProductPack } from './entities/product-pack.entity';

@Injectable()
export class ProductPackService {
  private readonly completeMessage = 'el producto componente';

  constructor(private readonly repository: ProductPackRepository) {}

  async findByProductPack(productpackId: string): Promise<ProductPack[]> {
    return this.repository.findByProductPack(productpackId);
  }

  async findOne(
    productpackId: string,
    productcompId: string,
  ): Promise<ProductPack> {
    const res: ProductPack = await this.repository.findOne(
      productpackId,
      productcompId,
    );
    if (!res)
      throw new NotFoundException(`No se encontró ${this.completeMessage}`);
    return res;
  }

  async create(body: Partial<ProductPack>): Promise<ProductPack> {
    const res: ProductPack = await this.repository.create(body);
    if (!res)
      throw new InternalServerErrorException(
        `No se pudo crear ${this.completeMessage}`,
      );
    return res;
  }

  async update(
    productpackId: string,
    productcompId: string,
    body: Partial<ProductPack>,
  ): Promise<UpdateResult> {
    const res = await this.repository.update(
      productpackId,
      productcompId,
      body,
    );
    if (res.affected === 0)
      throw new NotFoundException(
        `No se encontro ${this.completeMessage} a actualizar`,
      );
    return res;
  }

  async remove(
    productpackId: string,
    productcompId: string,
  ): Promise<DeleteResult> {
    try {
      const res = await this.repository.remove(productpackId, productcompId);
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
