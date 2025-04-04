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
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { Request } from 'express';

@Controller('subcategory')
@UseGuards(AuthGuard)
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}
  
  @Get() 
  async getSubcategories(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[Subcategory[], number]> {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      return this.subcategoryService.getSubcategories(
        req.user.commerce.id,
        pageNumber,
        limitNumber,
        search);
    }

  @Get('commerce')
  async getSubcategoryCommerce(@Req() req:Request ): Promise<Subcategory[]> {
    return this.subcategoryService.getSubcategoryCommerce(req.user.commerce.id);
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
