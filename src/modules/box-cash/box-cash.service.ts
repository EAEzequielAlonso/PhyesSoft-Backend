import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BoxCash } from './entities/box-cash.entity';
import { BoxCashRepository } from './box-cash.repository';
@Injectable()
export class BoxCashService {
  constructor(private readonly repository: BoxCashRepository) {}

  async findAll(commerceId: string, pageNumber:number,
      limitNumber: number,
      search: string): Promise<[BoxCash[], number]> {
    try {  
      const response = await this.repository.findAll(commerceId, pageNumber,
        limitNumber,
        search);
      return response 
    } catch (error) {
      throw new ConflictException("No puede asignar un mismo punto de venta a dos cajas distintas.")
    }
  }

  async findCommerce(commerceId:string): Promise<BoxCash[]> {
    try {
      const res = await this.repository.findCommerce(commerceId);
      if (!res) throw new NotFoundException("No se encontraron las Cajas")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string): Promise<BoxCash> {
    try {
      const res = await this.repository.findOne(id);
      if (!res) throw new NotFoundException("No se encontro la Caja")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async create(body: Partial<BoxCash>): Promise<BoxCash> {
    try {
      const res = await this.repository.create(body);
      if (!res) throw new InternalServerErrorException("No se pudo crear la caja")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, body: Partial<BoxCash>) {
    try {
      const res = await this.repository.update(id, body);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar la caja")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar la caja")
      return res;
    } catch (error) {
      throw new ConflictException(
        'Actualmente la caja esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando la caja si lo cree necesario. Error: ',error);
    }
  }
}
