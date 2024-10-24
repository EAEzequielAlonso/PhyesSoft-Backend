import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SizeRepository } from './size.repository';
import { Size } from './entities/size.entity';

@Injectable()
export class SizeService {

  constructor ( private readonly sizeRepository: SizeRepository) {}

  async getSizes (): Promise<Size[]> {
      return this.sizeRepository.getSizes();
  }

  async getSizeById (id:string): Promise<Size> {
    const size : Size = await this.sizeRepository.getSizeById(id);  
    if (!size) throw new NotFoundException("Talle no encontrada")
    return size;
  }

  async createSize (size: Partial<Size>): Promise<Size> {
    const sizeCreate : Size = await this.sizeRepository.createSize(size); 
    if (!sizeCreate) throw new InternalServerErrorException("No se pudo crear el talle")
    return sizeCreate;   
  }

  async updateSize (id:string, size: Partial<Size>): Promise<Size> {
    const sizeUpdate = await this.sizeRepository.updateSize(id, size); 
    if (sizeUpdate.affected === 0) throw new NotFoundException("No se encontro el talle a actualizar")
    return await this.sizeRepository.getSizeById(id)
  }

  async deleteSize (id:string): Promise<Size> {
    const size = await this.sizeRepository.getSizeById(id)
    if (!size) throw new NotFoundException("No se encontro el talle a eliminar")
    await this.sizeRepository.deleteSize(id); 
    return size
  } 
}
