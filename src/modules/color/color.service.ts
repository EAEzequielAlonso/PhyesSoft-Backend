import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Color } from './entities/color.entity';
import { ColorRepository } from './color.repository';

@Injectable()
export class ColorService {
  constructor(private readonly colorRepository: ColorRepository) {}

  async findAll(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[Color[], number]> {
    try {
      const response = await this.colorRepository.findAll(
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

  async findOne(id: string): Promise<Color> {
    try {
      const colorFind = await this.colorRepository.findOne(id);
      if (!colorFind) throw new NotFoundException('No se encontro el color');
      return colorFind;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(color: Partial<Color>): Promise<Color> {
    try {
      const colorRes = await this.colorRepository.create(color);
      if (!colorRes)
        throw new InternalServerErrorException('No se pudo crear el Color');
      return colorRes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, color: Partial<Color>) {
    try {
      const colorRes = await this.colorRepository.update(id, color);
      if (colorRes.affected === 0)
        throw new NotFoundException('No se pudo encontrar el Color');
      return colorRes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const colorRes = await this.colorRepository.remove(id);
      if (colorRes.affected === 0)
        throw new NotFoundException('No se pudo encontrar el Color');
      return colorRes;
    } catch (error) {
      throw new ConflictException(
        'Actualmente la categoria esta siendo usada. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando la categoria si lo cree necesario. Error: ',
        error,
      );
    }
  }
}
