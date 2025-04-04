import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorRepository {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async findAll(commerceId:string, pageNumber:number,
    limitNumber: number,
    search: string): Promise<[Color[], number]> {
    return this.colorRepository.findAndCount({where: { name: ILike(`%${search}%`), commerceId },
    order: { createdAt: "DESC" },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,});
  }

  async findOne(id: string): Promise<Color> {
    return this.colorRepository.findOne({
      where: { id }
    });
  }

  async create(color: Partial<Color>): Promise<Color> {
    return await this.colorRepository.save(color);
  }

  async update(
    id: string,
    color: Partial<Color>,
  ): Promise<UpdateResult> {
    return await this.colorRepository.update(id, color);
  }

  async remove(id: string): Promise<DeleteResult> {
      return await this.colorRepository.delete(id);
  }
}
