 import { Injectable } from '@nestjs/common';
 import { InjectRepository } from '@nestjs/typeorm';
 import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { ValueVariant } from './entities/value-variant.entity';
 
 @Injectable()
 export class ValueVariantRepository {
   constructor(
     @InjectRepository(ValueVariant)
     private repository: Repository<ValueVariant>,
   ) {} 
  
   async findAll(commerceId:string, pageNumber:number,
       limitNumber: number,
       search: string): Promise<[ValueVariant[], number]> {
        return await this.repository.findAndCount({where: { name: ILike(`%${search}%`), productvariant: {commerceId} },
       order: { createdAt: "DESC" },
       skip: (pageNumber - 1) * limitNumber,
       take: limitNumber,
       relations: {productvariant:true},
     });
     }
 
   async findByProductVariant(Id: string): Promise<ValueVariant[]> {
     return this.repository.find({ where: { productvariantId: Id } });
   }
 
   async findOne(id: string): Promise<ValueVariant> {
     return this.repository.findOne({
       where: { id },
       relations: { productvariant: true },
     });
   }
 
   async create(
    body: Partial<ValueVariant>, 
   ): Promise<ValueVariant> {
     return await this.repository.save(body);
   }
 
   async update(
     id: string,
     body: Partial<ValueVariant>,
   ): Promise<UpdateResult> {
     return await this.repository.update(id, body);
   }
 
   async remove(id: string): Promise<DeleteResult> {
       return await this.repository.delete(id);
   }
 }
 