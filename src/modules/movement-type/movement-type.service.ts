import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MovementTypeRepository } from './movement-type.repository';
import { MovementType } from './entities/movement-type.entity';

@Injectable()
export class MovementTypeService {
  constructor(private readonly repository: MovementTypeRepository) {}
    
      async findAll(commerceId: string, pageNumber:number,
          limitNumber: number,
          search: string): Promise<[MovementType[], number]> {
        try {  
          const response = await this.repository.findAll(commerceId, pageNumber,
            limitNumber,
            search);
          return response
        } catch (error) {
          throw new InternalServerErrorException(error)
        }
      }
    
      async findCemmerce(commerceId:string): Promise<MovementType[]> {
        try {
          const res = await this.repository.findCommerce(commerceId);
          if (!res) throw new NotFoundException("No se encontraron los tipos de movimientos")
          return res;
        } catch (error) {
          throw new InternalServerErrorException(error)
        }
      }
    
      async findOne(id: string): Promise<MovementType> {
        try {
          const res = await this.repository.findOne(id);
          if (!res) throw new NotFoundException("No se encontro el tipo de movimiento")
          return res;
        } catch (error) {
          throw new InternalServerErrorException(error)
        }
      }
    
      async create(mov: Partial<MovementType>): Promise<MovementType> {
        try {
          const res = await this.repository.create(mov);
          if (!res) throw new InternalServerErrorException("No se pudo crear el tipo de movimiento")
          return res;
        } catch (error) {
          throw new InternalServerErrorException(error)
        }
      }
    
      async update(id: string, mov: Partial<MovementType>) {
        try {
          const res = await this.repository.update(id, mov);
          if (res.affected === 0) throw new NotFoundException("No se pudo encontrar el tipo de moviemiento")
          return res;
        } catch (error) {
          throw new InternalServerErrorException(error)
        }
      }
    
      async remove(id: string) {
        try {
          const res = await this.repository.remove(id);
          if (res.affected === 0) throw new NotFoundException("No se pudo encontrar el tipo de movimiento")
          return res;
        } catch (error) {
          throw new ConflictException(
            'Actualmente el tipo de movimiento esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el tipo de movimiento si lo cree necesario. Error: ',error);
        }
      }
}
