import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Between, Equal, Repository } from 'typeorm';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  async getSales(startDate?: Date, endDate?: Date): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleRepository.find({
          where: { date: Between(startDate, endDate) },
        });
      } else {
        return await this.saleRepository.find({
          where: { date: Equal(startDate) },
        });
      }
    }
    return await this.saleRepository.find();
  }

  async getSalesByBranch(
    branchId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleRepository.find({
          where: {
            dailyCash: { boxCash: { branchId } },
            date: Between(startDate, endDate),
          },
        });
      } else {
        return await this.saleRepository.find({
          where: {
            dailyCash: { boxCash: { branchId } },
            date: Equal(startDate),
          },
        });
      }
    }
    return await this.saleRepository.find({
      where: { dailyCash: { boxCash: { branchId } } },
    });
  }

  async getSalesByCommerce(
    commerceId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleRepository.find({
          where: {
            dailyCash: { boxCash: { branch: { commerceId } } },
            date: Between(startDate, endDate),
          },
        });
      } else {
        return await this.saleRepository.find({
          where: {
            dailyCash: { boxCash: { branch: { commerceId } } },
            date: Equal(startDate),
          },
        });
      }
    }
    return await this.saleRepository.find({
      where: { dailyCash: { boxCash: { branch: { commerceId } } } },
    });
  }

  async getSaleById(id: string): Promise<Sale> {
    return await this.saleRepository.findOne({ where: { id } });
  }

  async createSale(sale: Partial<Sale>): Promise<Sale> {
    return await this.saleRepository.save(sale);
  }
}
