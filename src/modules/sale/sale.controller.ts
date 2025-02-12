import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './entities/sale.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sales')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  async getSales(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleService.getSales(startDate, endDate);
      } else {
        return await this.saleService.getSales(startDate);
      }
    }
    return await this.saleService.getSales();
  }

  @Get('branch/:branchId')
  async getSalesByBranch(
    @Param('branchId', ParseUUIDPipe) branchId: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleService.getSalesByBranch(
          branchId,
          startDate,
          endDate,
        );
      } else {
        return await this.saleService.getSalesByBranch(branchId, startDate);
      }
    }
    return await this.saleService.getSalesByBranch(branchId);
  }

  //   @Get("commerce/:commerceId")
  //   async getSalesByCommerce (@Param("commerceId", ParseUUIDPipe) commerceId:string,
  //                             @Query("startDate") startDate?: Date,
  //                             @Query("endDate") endDate?: Date): Promise<Sale[]> {
  //       if (startDate) {
  //           if (endDate) {
  //               return await this.saleService.getSalesByCommerce(commerceId, startDate, endDate);
  //           } else {
  //               return await this.saleService.getSalesByCommerce(commerceId, startDate);
  //           }
  //       }
  //       return await this.saleService.getSalesByCommerce(commerceId);
  //   }

  @Get(':id')
  async getSaleById(@Param('id', ParseUUIDPipe) id: string): Promise<Sale> {
    return await this.saleService.getSaleById(id);
  }

  @Post()
  async createSale(@Body() saleAndProducts: CreateSaleDto): Promise<Sale> {
    const { products, ...sale } = saleAndProducts;
    return await this.saleService.createSale(sale, products);
  }
}
