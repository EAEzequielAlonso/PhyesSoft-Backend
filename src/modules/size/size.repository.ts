import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizeRepository {
  constructor(
    @InjectRepository(Size)
    private repository: Repository<Size>,
  ) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[Size[], number]> {
    return await this.repository.findAndCount({
      where: { name: ILike(`%${search}%`), sizetype: { commerceId } },
      order: { createdAt: 'DESC' },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      relations: { sizetype: true },
    });
  }

  async findByCategory(sizetypeId: string): Promise<Size[]> {
    return this.repository.find({ where: { sizetypeId } });
  }

  async findOne(id: string): Promise<Size> {
    return this.repository.findOne({
      where: { id },
      relations: { sizetype: true },
    });
  }

  async create(size: Partial<Size>): Promise<Size> {
    return await this.repository.save(size);
  }

  async update(id: string, size: Partial<Size>): Promise<UpdateResult> {
    return await this.repository.update(id, size);
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw new ConflictException(
        'Actualmente el talle esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el talle si lo cree necesario',
      );
    }
  }
}
