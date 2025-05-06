import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { DailyCash } from './entities/daily-cash.entity';

@Injectable()
export class DailyCashRepository {
  constructor(
    @InjectRepository(DailyCash)
    private repository: Repository<DailyCash>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string): Promise<[DailyCash[], number]> {

    return await this.repository.findAndCount({where: { isOpen: true, boxCash: { branch: {commerceId}} },
    relations: {boxCash: {branch: true}, userOpen: true},
    order: { createdAt: "DESC" }, 
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findCommerce(commerceId: string): Promise<DailyCash[]> {
    return await this.repository.find({
      where: { boxCash: { branch: {commerceId}}}
    });
  }

  async findOpen(commerceId: string): Promise<DailyCash[]> {
    return await this.repository.find({
      relations: {boxCash: {branch:true}, userOpen:true},
      where: { boxCash: { branch: {commerceId}}, isOpen:true},
      order: { boxCash: {branchId : "DESC"} }
    });
  }

  async findOne(id: string): Promise<DailyCash> {
    return await this.repository.findOne({
      where: { id }
    });
  }

  async create(body: Partial<DailyCash>): Promise<DailyCash> {
    return await this.repository.save(body);
  }

  async update(
    id: string,
    body: Partial<DailyCash>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
