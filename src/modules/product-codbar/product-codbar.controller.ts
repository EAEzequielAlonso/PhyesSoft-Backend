import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCodbarService } from './product-codbar.service';
import { CreateProductCodbarDto } from './dto/create-product-codbar.dto';
import { UpdateProductCodbarDto } from './dto/update-product-codbar.dto';

@Controller('product-codbar')
export class ProductCodbarController {
  constructor(private readonly productCodbarService: ProductCodbarService) {}

  @Post()
  create(@Body() createProductCodbarDto: CreateProductCodbarDto) {
    return this.productCodbarService.create(createProductCodbarDto);
  }

  @Get()
  findAll() {
    return this.productCodbarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCodbarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCodbarDto: UpdateProductCodbarDto) {
    return this.productCodbarService.update(+id, updateProductCodbarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCodbarService.remove(+id);
  }
}
