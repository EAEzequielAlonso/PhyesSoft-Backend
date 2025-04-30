import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SalePointRepository } from './sales-point.repository';
import { SalePoint } from './entities/sales-point.entity';

@Injectable()
export class SalePointService {
  constructor(private readonly repository: SalePointRepository) {}

  async findAll(commerceId: string, pageNumber:number,
      limitNumber: number,
      search: string): Promise<[SalePoint[], number]> {
    try {  
      const response = await this.repository.findAll(commerceId, pageNumber,
        limitNumber,
        search);
      return response 
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findCommerce(commerceId:string): Promise<SalePoint[]> {
    try {
      const res = await this.repository.findCommerce(commerceId);
      if (!res) throw new NotFoundException("No se encontraron los puntos de venta")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: string): Promise<SalePoint> {
    try {
      const res = await this.repository.findOne(id);
      if (!res) throw new NotFoundException("No se encontro el punto de venta")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async create(body: Partial<SalePoint>): Promise<SalePoint> {
    try {
      const res = await this.repository.create(body);
      if (!res) throw new InternalServerErrorException("No se pudo crear el punto de venta")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, body: Partial<SalePoint>) {
    try {
      const res = await this.repository.update(id, body);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar el punto de venta")
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0) throw new NotFoundException("No se pudo encontrar el punto de venta")
      return res;
    } catch (error) {
      throw new ConflictException(
        'Actualmente el punto de venta esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el punto de venta si lo cree necesario. Error: ',error);
    }
  }
}
