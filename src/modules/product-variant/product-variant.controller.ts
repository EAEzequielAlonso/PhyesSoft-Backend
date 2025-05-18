import { Controller, Get, Post, Body, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductVariantService } from './product-variant.service';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Controller('product-variant')  
@UseGuards(AuthGuard)
export class ProductVariantController {
  constructor(private readonly service: ProductVariantService) {}
 
  @Get()
  @ApiBearerAuth() 
  async findAll(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[ProductVariant[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search);
  }

  @Get('commerce')
  async findCemmerce(@Req() req: Request): Promise<ProductVariant[]> {
    return await this.service.findCemmerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductVariant> {
    return await this.service.findOne(id);
  }
 
  @Post()
  async create(@Body() body: CreateProductVariantDto, @Req() req:Request): Promise<ProductVariant> {
      return await this.service.create({...body, commerceId: req.user.commerce.id});
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateProductVariantDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
