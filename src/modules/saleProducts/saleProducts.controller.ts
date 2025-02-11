import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SaleProductsService } from './saleProducts.service';
import { CreateSaleProductDto } from './dto/create-saleProduct.dto';
import { UpdateSaleProductDto } from './dto/update-saleProduct.dto';
import { ApiTags } from '@nestjs/swagger';
import { SaleProducts } from './entities/saleProducts.entity';

@ApiTags('Producs for Sale')
@Controller('saleproducts')
export class SaleProductsController {
  constructor(private readonly saleProductsService: SaleProductsService) {}

  @Get()
  async getSaleProducts(): Promise<SaleProducts[]> {
    return await this.saleProductsService.getSaleProducts();
  }

  @Get('sale/:saleId')
  async getSaleProductsBySale(
    @Param('saleId', ParseUUIDPipe) saleId: string,
  ): Promise<SaleProducts[]> {
    return await this.saleProductsService.getSaleProductsBySale(saleId);
  }

  @Post()
  async createSaleProducts(
    @Body() saleProducts: CreateSaleProductDto,
  ): Promise<SaleProducts> {
    return await this.saleProductsService.createSaleProducts(saleProducts);
  }
}
