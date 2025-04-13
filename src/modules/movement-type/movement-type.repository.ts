import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { MovementType } from './entities/movement-type.entity';

@Injectable()
export class MovementTypeRepository {
  constructor(
    @InjectRepository(MovementType)
    private repository: Repository<MovementType>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string): Promise<[MovementType[], number]> {
    return this.repository.findAndCount({where: { name: ILike(`%${search}%`), commerceId },
    order: { createdAt: "DESC" },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findCommerce(commerceId: string): Promise<MovementType[]> {
    return this.repository.find({
      where: { commerceId }
    });
  }

  async findOne(id: string): Promise<MovementType> {
    return this.repository.findOne({
      where: { id }
    });
  }

  async create(mov: Partial<MovementType>): Promise<MovementType> {
    return await this.repository.save(mov);
  }

  async update(
    id: string,
    mov: Partial<MovementType>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, mov);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.repository.delete(id);
  }
}
