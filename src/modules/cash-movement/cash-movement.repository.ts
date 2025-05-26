import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { CashMovement } from './entities/cash-movement.entity';

@Injectable()
export class CashMovementRepository {
  constructor(
    @InjectRepository(CashMovement)
    private repository: Repository<CashMovement>,
  ) {}

  async findAll(
    dailyCashId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[CashMovement[], number]> {
    return await this.repository.findAndCount({
      where: { description: ILike(`%${search}%`), dailyCashId },
      relations: { userCreateMov: true, movementType: true },
      order: { createdAt: 'DESC' },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
  }

  async findOne(id: string): Promise<CashMovement> {
    return await this.repository.findOne({
      where: { id },
      relations: { userCreateMov: true, movementType: true },
    });
  }

  async create(body: Partial<CashMovement>): Promise<CashMovement> {
    return await this.repository.save(body);
  }

  async update(id: string, body: Partial<CashMovement>): Promise<UpdateResult> {
    return await this.repository.update(id, body);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
