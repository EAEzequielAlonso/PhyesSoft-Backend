import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { ProductVariant } from './entities/product-variant.entity';

@Injectable()
export class ProductVariantRepository {
  constructor(
    @InjectRepository(ProductVariant)
    private repository: Repository<ProductVariant>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string): Promise<[ProductVariant[], number]> {
    return this.repository.findAndCount({where: { name: ILike(`%${search}%`), commerceId },
    order: { createdAt: "DESC" }, 
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findCommerce(commerceId: string): Promise<ProductVariant[]> {
    return this.repository.find({
      where: { commerceId }
    });
  }

  async findOne(id: string): Promise<ProductVariant> {
    return this.repository.findOne({
      where: { id }
    });
  }

  async create(body: Partial<ProductVariant>): Promise<ProductVariant> {
    return await this.repository.save(body);
  }

  async update(
    id: string,
    body: Partial<ProductVariant>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
