import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { SalePoint } from './entities/sales-point.entity';

@Injectable()
export class SalePointRepository {
  constructor(
    @InjectRepository(SalePoint)
    private repository: Repository<SalePoint>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string): Promise<[SalePoint[], number]> {
    return this.repository.findAndCount({where: { name: ILike(`%${search}%`), branch: {commerceId} },
    relations: {branch:true},
    order: { createdAt: "DESC" }, 
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findCommerce(commerceId: string): Promise<SalePoint[]> {
    return this.repository.find({
      where: { branch: {commerceId} }
    });
  }

  async findOne(id: string): Promise<SalePoint> {
    return this.repository.findOne({
      where: { id }
    });
  }

  async create(body: Partial<SalePoint>): Promise<SalePoint> {
    return await this.repository.save(body);
  }

  async update(
    id: string,
    body: Partial<SalePoint>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
