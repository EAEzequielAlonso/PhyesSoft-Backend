import { Module } from '@nestjs/common';
import { SaleProductsService } from './saleProducts.service';
import { SaleProductsController } from './saleProducts.controller';

@Module({
  controllers: [SaleProductsController],
  providers: [SaleProductsService],
})
export class SaleProductsModule {}
