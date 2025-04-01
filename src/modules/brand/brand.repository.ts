import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>,
  ) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string
  ): Promise<[Brand[], number]> {
    return this.repository.findAndCount({
      where: { 
        name: Like(`%${search}%`), 
        commerceId 
      },
      order: { createdAt: "DESC" }, // Asegúrate de que la entidad tenga un campo createdAt
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
  }

  async findCommerce(commerceId:string): Promise<Brand[]> {
    return await this.repository.find({where: {commerceId}});
  }

  async findOne(id: string): Promise<Brand> {
    return this.repository.findOne({
      where: { id }
    });
  }

  async create(brand: Partial<Brand>): Promise<Brand> {
    return await this.repository.save(brand);
  }

  async update(
    id: string,
    brand: Partial<Brand>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, brand);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
