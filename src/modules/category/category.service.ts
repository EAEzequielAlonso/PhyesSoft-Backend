import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor ( private readonly categoryRepository: CategoryRepository) {}

  async getCategories (): Promise<Category[]> {
      return this.categoryRepository.getCategories();
  }

  async getCategoryById (id:string): Promise<Category> {
    const category : Category = await this.categoryRepository.getCategoryById(id);  
    if (!category) throw new NotFoundException("Categoria no encontrada")
    return category;
  }

  async createCategory (category: Partial<Category>): Promise<Category> {
    const categoryCreate : Category = await this.categoryRepository.createCategory(category); 
    if (!categoryCreate) throw new InternalServerErrorException("No se pudo crear la categoria")
    return categoryCreate;   
  }

  async updateCategory (id:string, category: Partial<Category>): Promise<Category> {
    const categoryUpdate = await this.categoryRepository.updateCategory(id, category); 
    if (categoryUpdate.affected === 0) throw new NotFoundException("No se encontro la categoria a actualizar")
    return await this.categoryRepository.getCategoryById(id)
  }

  async deleteCategory (id:string): Promise<Category> {
    const category = await this.categoryRepository.getCategoryById(id)
    if (!category) throw new NotFoundException("No se encontro la categoria a eliminar")
    await this.categoryRepository.deleteCategory(id); 
    return category
  } 
}
