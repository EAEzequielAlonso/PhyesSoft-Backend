import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { SizeType } from './entities/size-type.entity';

@Injectable()
export class SizeTypeRepository {
  constructor(
    @InjectRepository(SizeType)
    private repository: Repository<SizeType>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string,
    sortField: string,
    sortOrder: string): Promise<[SizeType[], number]> {
    return this.repository.findAndCount({where: { name: Like(`%${search}%`), commerceId },
    order: { [sortField]: sortOrder.toUpperCase() },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findCommerce(commerceId: string): Promise<SizeType[]> {
    return this.repository.find({
      where: { commerceId }
    });
  }

  async findOne(id: string): Promise<SizeType> {
    return this.repository.findOne({
      where: { id }
    });
  }

  async create(sizeType: Partial<SizeType>): Promise<SizeType> {
    return await this.repository.save(sizeType);
  }

  async update(
    id: string,
    sizeType: Partial<SizeType>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, sizeType);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
