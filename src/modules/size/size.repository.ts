 import { ConflictException, Injectable } from '@nestjs/common';
 import { InjectRepository } from '@nestjs/typeorm';
 import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Size } from './entities/size.entity';
 
 @Injectable()
 export class SizeRepository {
   constructor(
     @InjectRepository(Size)
     private repository: Repository<Size>,
   ) {} 
  
   async findAll(commerceId:string, pageNumber:number,
       limitNumber: number,
       name: string,
       optionId: string,
       sortField: string,
       sortOrder: string): Promise<[Size[], number]> {
         
       const query = this.repository.createQueryBuilder("size")
         .leftJoinAndSelect("size.sizeType", "sizeType")
         .where("size.name LIKE :name", { name: `%${name}%` })
         .andWhere("sizeType.commerceId = :commerceId", { commerceId })
       
       if (optionId !== '') query.andWhere("size.sizeTypeId = :optionId", { optionId });
         
       // Agregar orden dinámico
       if (sortField !== "name") {
         query.orderBy("sizeType.name", sortOrder.toUpperCase() as "ASC" | "DESC");
       } else {
         query.orderBy("size.name", sortOrder.toUpperCase() as "ASC" | "DESC");
       }
       
       // Aplicar paginación
       query.skip((pageNumber - 1) * limitNumber).take(limitNumber);
       
       return await query.getManyAndCount();
     }
 
   async findByCategory(sizeTypeId: string): Promise<Size[]> {
     return this.repository.find({ where: { sizeTypeId } });
   }
 
   async findOne(id: string): Promise<Size> {
     return this.repository.findOne({
       where: { id },
       relations: { sizeType: true },
     });
   }
 
   async create(
    size: Partial<Size>,
   ): Promise<Size> {
     return await this.repository.save(size);
   }
 
   async update(
     id: string,
     size: Partial<Size>,
   ): Promise<UpdateResult> {
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
 