import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('subcategory')
@UseGuards(AuthGuard)
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}
  
  @Get()
  async getSubcategories(): Promise<Subcategory[]> {
    return this.subcategoryService.getSubcategories();
  }

  @Get('category/:categoryId')
  async getSubcategoriesByCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ): Promise<Subcategory[]> {
    return this.subcategoryService.getSubcategoriesByCategory(categoryId);
  }

  @Get(':id')
  async getSubcategoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Subcategory> {
    return this.subcategoryService.getSubcategoryById(id);
  }

  @Post()
  async createSubcategory(
    @Body() subcategory: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    return await this.subcategoryService.createSubcategory(subcategory);
  }

  @Put(':id')
  async updateSubcategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() subcategory: UpdateSubcategoryDto,
  ): Promise<Subcategory> {
    return await this.subcategoryService.updateSubcategory(id, subcategory);
  }

  @Delete(':id')
  async deleteSubcategory(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Subcategory> {
    return await this.subcategoryService.deleteSubcategory(id);
  }
}
