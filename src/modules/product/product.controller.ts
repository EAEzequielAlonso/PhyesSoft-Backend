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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto, searchDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { Request } from 'express';

@ApiTags('Products')
@Controller('product')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("getproducts")
  async getProducts(
          @Req() req: Request, 
          @Query('page') page = '1',
          @Query('limit') limit = '10',
          @Query('sortField') sortField = 'name',
          @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
          @Body() search 
        ): Promise<[Product[], number]> {
          const pageNumber = parseInt(page, 10) || 1;
          const limitNumber = parseInt(limit, 10) || 10;
          
          return await this.productService.getProducts(
            req.user.commerce.id,
            pageNumber,
            limitNumber,
            search,
            sortField,
            sortOrder);
  }

  @Get('subcategory/:subcategoryId')
  async getProductByCommerceIdSubcategory(
    @Param('subcategoryId', ParseUUIDPipe) subcategoryId: string,
  ): Promise<Product[]> {
    return await this.productService.getProductBySubcategory(subcategoryId);
  }

  @Get('model/:modelId')
  async getProductByModel(
    @Param('modelId', ParseUUIDPipe) modelId: string,
  ): Promise<Product[]> {
    return await this.productService.getProductByModel(modelId);
  }

  @Get(':id')
  async getProductBranchById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto, @Req() req:Request): Promise<Product> {
    return await this.productService.createProduct({...product, commerceId: req.user.commerce.id});
  }

  @Put('unsubscribe/:id')
  async unsubscribeProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    return await this.productService.unsubscribeProduct(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<string> {
    return await this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.productService.deleteProduct(id);
  }
}
