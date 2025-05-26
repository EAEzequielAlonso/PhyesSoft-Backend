import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { FiscalData } from './entities/fiscal-data.entity';

@Injectable()
export class FiscalDataRepository {
  constructor(
    @InjectRepository(FiscalData)
    private repository: Repository<FiscalData>,
  ) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[FiscalData[], number]> {
    return this.repository.findAndCount({
      where: { name: ILike(`%${search}%`), commerceId },
      order: { createdAt: 'DESC' },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
  }

  async findCommerce(commerceId: string): Promise<FiscalData[]> {
    return this.repository.find({
      where: { commerceId },
    });
  }

  async findOne(id: string): Promise<FiscalData> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(body: Partial<FiscalData>): Promise<FiscalData> {
    return await this.repository.save(body);
  }

  async update(id: string, body: Partial<FiscalData>): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
