import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DailyCashRepository } from './daily-cash.repository';
import { DailyCash } from './entities/daily-cash.entity';

@Injectable()
export class DailyCashService {
  constructor(private readonly repository: DailyCashRepository) {}

  async findAll(commerceId: string, pageNumber:number,
      limitNumber: number,
      search: string): Promise<[DailyCash[], number]> {
    try {  
      const response = await this.repository.findAll(commerceId, pageNumber,
        limitNumber,
        search);
      return response 
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findCommerce(commerceId:string): Promise<DailyCash[]> {
    try {
      const res = await this.repository.findCommerce(commerceId);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOpen(commerceId: string): Promise<DailyCash[]> {
    try {
      const res = await this.repository.findOpen(commerceId);
      if (!res) throw new NotFoundException("No se encontraron cajas diarias abiertas")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string): Promise<DailyCash> {
    try {
      const res = await this.repository.findOne(id);
      if (!res) throw new NotFoundException("No se encontro la caja diaria")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async create(body: Partial<DailyCash>): Promise<DailyCash> {
    try {
      const res = await this.repository.create(body);
      if (!res) throw new NotFoundException("No se pudo crear la caja diaria")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, body: Partial<DailyCash>) {
    try {
      const res = await this.repository.update(id, body);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar la caja diaria")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar la caja diaria")
      return res;
    } catch (error) {
      throw new ConflictException(
        'Actualmente la caja diaria esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando la caja diaria si lo cree necesario. Error: ',error);
    }
  }
}
