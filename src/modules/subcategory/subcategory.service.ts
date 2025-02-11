import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SubcategoryRepository } from './subcategory.repository';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(private readonly subcategoryRepository: SubcategoryRepository) {}

  async getSubcategories(): Promise<Subcategory[]> {
    return this.subcategoryRepository.getSubcategories();
  }

  async getSubcategoriesByBrand(brandId: string): Promise<Subcategory[]> {
    return this.subcategoryRepository.getSubcategoriesByBrand(brandId);
  }

  async getSubcategoryById(id: string): Promise<Subcategory> {
    const subcategory: Subcategory =
      await this.subcategoryRepository.getSubcategoryById(id);
    if (!subcategory) throw new NotFoundException('Subcategoria no encontrada');
    return subcategory;
  }

  async createSubcategory(
    subcategory: Partial<Subcategory>,
  ): Promise<Subcategory> {
    const subcategoryCreate: Subcategory =
      await this.subcategoryRepository.createSubcategory(subcategory);
    if (!subcategoryCreate)
      throw new InternalServerErrorException(
        'No se pudo crear la subcategoria',
      );
    return subcategoryCreate;
  }

  async updateSubcategory(
    id: string,
    subcategory: Partial<Subcategory>,
  ): Promise<Subcategory> {
    const subcategoryUpdate =
      await this.subcategoryRepository.updateSubcategory(id, subcategory);
    if (subcategoryUpdate.affected === 0)
      throw new NotFoundException(
        'No se encontro la subcategoria a actualizar',
      );
    return await this.subcategoryRepository.getSubcategoryById(id);
  }

  async deleteSubcategory(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.getSubcategoryById(id);
    if (!subcategory)
      throw new NotFoundException('No se encontro la subcategoria a eliminar');
    await this.subcategoryRepository.deleteSubcategory(id);
    return subcategory;
  }
}
