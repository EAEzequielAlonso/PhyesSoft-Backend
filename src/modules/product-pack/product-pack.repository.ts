import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductPack } from './entities/product-pack.entity';

@Injectable()
export class ProductPackRepository {
  constructor(
    @InjectRepository(ProductPack)
    private repository: Repository<ProductPack>,
  ) {}

  async findByProductPack(productpackId: string): Promise<ProductPack[]> {
    return this.repository.find({ where: { productpackId } });
  }

  async findOne(
    productpackId: string,
    productcompId: string,
  ): Promise<ProductPack> {
    return this.repository.findOne({
      where: { productpackId, productcompId },
      relations: { productcomp: true },
    });
  }

  async create(body: Partial<ProductPack>): Promise<ProductPack> {
    return await this.repository.save(body);
  }

  async update(
    productpackId: string,
    productcompId: string,
    body: Partial<ProductPack>,
  ): Promise<UpdateResult> {
    return await this.repository.update({ productpackId, productcompId }, body);
  }

  async remove(
    productpackId: string,
    productcompId: string,
  ): Promise<DeleteResult> {
    return await this.repository.delete({ productpackId, productcompId });
  }
}
