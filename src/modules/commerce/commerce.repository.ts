import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Commerce } from './entities/commerce.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CommerceRepository {
  constructor(
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
  ) {}

  async getCommerce(id: string): Promise<Commerce> {
    return await this.commerceRepository.findOneBy({ id });
  }

  // async getCommerceByUserId (userId: string): Promise<Commerce[]> {
  //   return await this.commerceRepository.find({where: {userPropId: userId}})
  // }

  // async exist (commerceId: string, userId: string): Promise<Boolean> {
  //   return await this.commerceRepository.exists({where: {id:commerceId, userPropId: userId}})
  // }

  async getCommerceById(id: string): Promise<Commerce> {
    return await this.commerceRepository.findOne({ where: { id } });
  }

  async createCommerce(commerce: Partial<Commerce>): Promise<Commerce> {
    return await this.commerceRepository.save(commerce);
  }

  async updateCommerce(
    id: string,
    commerce: Partial<Commerce>,
  ): Promise<UpdateResult> {
    return await this.commerceRepository.update(id, commerce);
  }

  async deleteCommerce(id: string): Promise<DeleteResult> {
    return await this.commerceRepository.delete(id);
  }

  async unsubscribeCommerce(id: string): Promise<UpdateResult> {
    return await this.commerceRepository.update(id, { endDate: new Date() });
  }
}
