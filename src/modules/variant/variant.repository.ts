import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantRepository {
  constructor(
    @InjectRepository(Variant)
    private repository: Repository<Variant>,
  ) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[Variant[], number]> {
    return this.repository.findAndCount({
      where: { name: ILike(`%${search}%`), commerceId },
      order: { createdAt: 'DESC' },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
  }

  async findCommerce(commerceId: string): Promise<Variant[]> {
    return this.repository.find({
      where: { commerceId },
    });
  }

  async findOne(id: string): Promise<Variant> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(body: Partial<Variant>): Promise<Variant> {
    return await this.repository.save(body);
  }

  async update(
    id: string,
    body: Partial<Variant>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
