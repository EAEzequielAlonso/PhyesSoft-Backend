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
  Req,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiBearerAuth()
  async getCategories(
    @Req() req: Request, 
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
    @Query('sortField') sortField = 'name',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc', ): Promise<[Category[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.categoryService.getCategories(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search,
      sortField,
      sortOrder);
  }

  @Get('commerce')
  async getCategoryByCommerce(@Req() req:Request): Promise<Category[]> {
    console.log(`entramos en el controlador de category ${req.user.commerce.id}`)
    return await this.categoryService.getCategoryByCommerce(req.user.commerce.id);
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Category> {
    return await this.categoryService.getCategoryById(id);
  }
  @Post()
  async createCategory(@Body() category: CreateCategoryDto, @Req() req:Request): Promise<Category> {
    return await this.categoryService.createCategory({...category, commerceId: req.user.commerce.id});
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, category);
  }
 
  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Category> {
    return await this.categoryService.deleteCategory(id);
  }
}
