import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags("Products")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts (): Promise<Product[]> {
    return await this.productService.getProducts()
  }

  @Get("subcategory/:subcategoryId")
  async getProductByCommerceIdSubcategory (@Param("subcategoryId", ParseUUIDPipe) subcategoryId: string): Promise<Product[]> {
    return await this.productService.getProductBySubcategory(subcategoryId)
  }

  @Get("model/:modelId")
  async getProductByModel (@Param("modelId", ParseUUIDPipe) modelId: string): Promise<Product[]> {
    return await this.productService.getProductByModel(modelId)
  }

  @Get(":id")
  async getProductBranchById (@Param("id", ParseUUIDPipe) id: string): Promise<Product> {
    return await this.productService.getProductById(id)
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(product);
  }

  @Put("unsubscribe/:id")
  async unsubscribeProduct(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.productService.unsubscribeProduct(id);
  }

  @Put(":id")
  async updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string> {
    return await this.productService.updateProduct(id, product);
  }

  @Delete(":id")
  async deleteProduct(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.productService.deleteProduct(id);
  }

}
