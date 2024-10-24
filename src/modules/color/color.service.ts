import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ColorRepository } from './color.repository';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {

  constructor ( private readonly colorRepository: ColorRepository) {}

  async getColors (): Promise<Color[]> {
      return this.colorRepository.getColors();
  }

  async getColorById (id:string): Promise<Color> {
    const color : Color = await this.colorRepository.getColorById(id);  
    if (!color) throw new NotFoundException("Color no encontrado")
    return color;
  }

  async createColor (color: Partial<Color>): Promise<Color> {
    const colorCreate : Color = await this.colorRepository.createColor(color); 
    if (!colorCreate) throw new InternalServerErrorException("No se pudo crear el color")
    return colorCreate;   
  }

  async updateColor (id:string, color: Partial<Color>): Promise<Color> {
    const colorUpdate = await this.colorRepository.updateColor(id, color); 
    if (colorUpdate.affected === 0) throw new NotFoundException("No se encontro el color a actualizar")
    return await this.colorRepository.getColorById(id)
  }

  async deleteColor (id:string): Promise<Color> {
    const color = await this.colorRepository.getColorById(id)
    if (!color) throw new NotFoundException("No se encontro el color a eliminar")
    await this.colorRepository.deleteColor(id); 
    return color
  } 

}
