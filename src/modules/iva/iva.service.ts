import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IvaRepository } from './iva.repository';
import { Iva } from './entities/iva.entity';

@Injectable()
export class IvaService {
  private readonly completeMessage = 'el impuesto Iva';

  constructor(private readonly repository: IvaRepository) {}

  async findAll(): Promise<Iva[]> {
    try {
      const response = await this.repository.findAll();
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Iva> {
    try {
      const res = await this.repository.findOne(id);
      if (!res)
        throw new NotFoundException(`No se encontro ${this.completeMessage}`);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(body: Partial<Iva>): Promise<Iva> {
    try {
      const res = await this.repository.create(body);
      if (!res)
        throw new InternalServerErrorException(
          `No se pudo crear ${this.completeMessage}`,
        );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, body: Partial<Iva>) {
    try {
      const res = await this.repository.update(id, body);
      if (res.affected === 0)
        throw new NotFoundException(
          `No se pudo encontrar ${this.completeMessage}`,
        );
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.repository.remove(id);
      if (res.affected === 0)
        throw new NotFoundException(
          `No se pudo encontrar ${this.completeMessage}`,
        );
      return res;
    } catch (error) {
      throw new ConflictException(
        `Actualmente ${this.completeMessage} esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando ${this.completeMessage} si lo cree necesario. Error: `,
        error,
      );
    }
  }
}
