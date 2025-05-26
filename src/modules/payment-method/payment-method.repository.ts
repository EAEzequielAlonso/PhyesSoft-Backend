import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodRepository {
  constructor(
    @InjectRepository(PaymentMethod)
    private repository: Repository<PaymentMethod>,
  ) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[PaymentMethod[], number]> {
    return this.repository.findAndCount({
      where: { name: ILike(`%${search}%`), commerceId },
      order: { createdAt: 'DESC' },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
  }

  async findCommerce(commerceId: string): Promise<PaymentMethod[]> {
    return this.repository.find({
      where: { commerceId },
    });
  }

  async findOne(id: string): Promise<PaymentMethod> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(method: Partial<PaymentMethod>): Promise<PaymentMethod> {
    return await this.repository.save(method);
  }

  async update(
    id: string,
    method: Partial<PaymentMethod>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, method);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
