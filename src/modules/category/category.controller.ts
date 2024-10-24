import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories (): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get("id")
  async getCategoryById (@Param("id", ParseUUIDPipe) id:string): Promise<Category> {
      return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory (@Body() category: CreateCategoryDto): Promise<Category> {
      return await this.categoryService.createCategory(category);
  }

  @Put("id")
  async updateCategory (@Param("id", ParseUUIDPipe) id:string, category: UpdateCategoryDto): Promise<Category> {
    return await this.categoryService.updateCategory(id, category);
  }

  @Delete("id")
  async deleteCategory (@Param("id", ParseUUIDPipe) id:string): Promise<Category> {
    return await this.categoryService.deleteCategory (id);
  }  
}
