import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { BoxCash } from './entities/box-cash.entity';

@Injectable()
export class BoxCashRepository {
  constructor(
    @InjectRepository(BoxCash)
    private repository: Repository<BoxCash>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string): Promise<[BoxCash[], number]> {

    return await this.repository.findAndCount({where: { name: ILike(`%${search}%`), branch: { commerceId} },
    relations: {branch: true, salePoint:true},
    order: { createdAt: "DESC" }, 
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findCommerce(commerceId: string): Promise<BoxCash[]> {
    return await this.repository.find({
      where: { branch: {commerceId}}
    });
  }

  async findOne(id: string): Promise<BoxCash> {
    return await this.repository.findOne({
      where: { id }
    });
  }

  async create(body: Partial<BoxCash>): Promise<BoxCash> {
    return await this.repository.save(body);
  }

  async update(
    id: string,
    body: Partial<BoxCash>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
