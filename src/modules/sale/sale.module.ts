import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { SaleRepository } from './sale.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleProductsService } from '../saleProducts/saleProducts.service';
import { SaleProductsRepository } from '../saleProducts/saleProducts.repository';
import { SaleProducts } from '../saleProducts/entities/saleProducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleProducts])],
  controllers: [SaleController],
  providers: [
    SaleService,
    SaleRepository,
    SaleProductsService,
    SaleProductsRepository,
  ],
})
export class SaleModule {}
