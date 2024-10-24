import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}
  @Get()
  async getSubcategories (): Promise<Subcategory[]> {
    return this.subcategoryService.getSubcategories();
  }

  @Get("brand/:brandId")
  async getSubcategoriesByBrand (@Param("brandId", ParseUUIDPipe) brandId:string): Promise<Subcategory[]> {
    return this.subcategoryService.getSubcategoriesByBrand(brandId);
  }

  @Get("id")
  async getSubcategoryById (@Param("id", ParseUUIDPipe) id:string): Promise<Subcategory> {
      return this.subcategoryService.getSubcategoryById(id);
  }

  @Post()
  async createSubcategory (@Body() model: CreateSubcategoryDto): Promise<Subcategory> {
      return await this.subcategoryService.createSubcategory(model);
  }

  @Put("id")
  async updateSubcategory (@Param("id", ParseUUIDPipe) id:string, model: UpdateSubcategoryDto): Promise<Subcategory> {
    return await this.subcategoryService.updateSubcategory(id, model);
  }

  @Delete("id")
  async deleteSubcategory (@Param("id", ParseUUIDPipe) id:string): Promise<Subcategory> {
    return await this.subcategoryService.deleteSubcategory (id);
  }  
}
