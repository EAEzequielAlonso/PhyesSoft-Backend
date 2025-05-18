import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductPackService } from './product-pack.service';
import { CreateProductPackDto } from './dto/create-product-pack.dto';
import { UpdateProductPackDto } from './dto/update-product-pack.dto';

@Controller('product-pack')
export class ProductPackController {
  constructor(private readonly productPackService: ProductPackService) {}

  @Post()
  create(@Body() createProductPackDto: CreateProductPackDto) {
    return this.productPackService.create(createProductPackDto);
  }

  @Get()
  findAll() {
    return this.productPackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductPackDto: UpdateProductPackDto) {
    return this.productPackService.update(+id, updateProductPackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPackService.remove(+id);
  }
}
