import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderRepository {

  constructor(@InjectRepository(Provider) private repository: Repository<Provider>) {}

  create(body: Partial<Provider>) {
    return this.repository.save(body);
  }

  async findAll(
      commerceId: string,
      pageNumber: number,
      limitNumber: number,
      search: string,
    ): Promise<[Provider[], number]> {
      return this.repository.findAndCount({
        where: { name: ILike(`%${search}%`), commerceId },
        order: { createdAt: 'DESC' },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
      });
    }

  async findCommerce(commerceId: string): Promise<Provider[]> {
      return await this.repository.find({where : {commerceId}});
    }

  findOne(id: string) {
    return this.repository.findOneBy({id});
  }

  update(id: string, body: Partial<Provider>) {
    return this.repository.update(id, body);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
