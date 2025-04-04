import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { Category } from '../category/entities/category.entity';
import { Commerce } from '../commerce/entities/commerce.entity';

@Injectable()
export class SubcategoryRepository {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {} 
 
  async getSubcategories(commerceId:string, pageNumber:number,
      limitNumber: number,
      search: string): Promise<[Subcategory[], number]> {
        
      return this.subcategoryRepository.findAndCount({where: { name: ILike(`%${search}%`), category: {commerceId} },
          order: { createdAt: "DESC" },
          skip: (pageNumber - 1) * limitNumber,
          take: limitNumber,
          relations: {category:true},
        });
    }

  async getSubcategoriesByCategory(categoryId: string): Promise<Subcategory[]> {
    return this.subcategoryRepository.find({ where: { categoryId } });
  }

  async getSubcategoryCommerce(commerceId:string): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find({where: {category: {commerceId}}});
  }

  async getSubcategoryById(id: string): Promise<Subcategory> {
    return this.subcategoryRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async createSubcategory(
    subcategory: Partial<Subcategory>,
  ): Promise<Subcategory> {
    return await this.subcategoryRepository.save(subcategory);
  }

  async updateSubcategory(
    id: string,
    subcategory: Partial<Subcategory>,
  ): Promise<UpdateResult> {
    return await this.subcategoryRepository.update(id, subcategory);
  }

  async deleteSubcategory(id: string): Promise<DeleteResult> {
    try {
      return await this.subcategoryRepository.delete(id);
    } catch (e) {
      throw new ConflictException(
        'Actualmente la subcategoria esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando la subcategoria si lo cree necesario',
      );
    }
  }
}
