import { Module } from '@nestjs/common';
import { SaleProductsService } from './saleProducts.service';
import { SaleProductsController } from './saleProducts.controller';
import { SaleProductsRepository } from './saleProducts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProducts } from './entities/saleProducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProducts])],
  controllers: [SaleProductsController],
  providers: [SaleProductsService, SaleProductsRepository],
})
export class SaleProductsModule {}
