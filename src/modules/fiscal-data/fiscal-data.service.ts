import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FiscalDataRepository } from './fiscal-data.repository';
import { FiscalData } from './entities/fiscal-data.entity';

@Injectable()
export class FiscalDataService {
  constructor(private readonly repository: FiscalDataRepository) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[FiscalData[], number]> {
    try {
      const response = await this.repository.findAll(
        commerceId,
        pageNumber,
        limitNumber,
        search,
      );
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findCommerce(commerceId: string): Promise<FiscalData[]> {
    try {
      const res = await this.repository.findCommerce(commerceId);
      if (!res)
        throw new NotFoundException('No se encontraron los datos Fiscales');
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<FiscalData> {
    try {
      const find = await this.repository.findOne(id);
      if (!find) throw new NotFoundException('No se encontro el dato fiscal');
      return find;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(body: Partial<FiscalData>): Promise<FiscalData> {
    try {
      console.log('este es la info como llega: ', body);
      console.log('tipo de dato del cuit: ', typeof body.cuit);
      const res = await this.repository.create(body);
      if (!res)
        throw new InternalServerErrorException(
          'No se pudo crear el dato fiscal',
        );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, body: Partial<FiscalData>) {
    try {
      const res = await this.repository.update(id, body);
      if (res.affected === 0)
        throw new NotFoundException('No se pudo encontrar el dato fiscal');
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0)
        throw new NotFoundException('No se pudo encontrar el dato fiscal');
      return res;
    } catch (error) {
      throw new ConflictException(
        'Actualmente el dato fiscal esta siendo usada. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el dato fiscal si lo cree necesario. Error: ',
        error,
      );
    }
  }
}
