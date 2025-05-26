import { Module } from '@nestjs/common';
import { ProductCodbarService } from './product-codbar.service';
import { ProductCodbarController } from './product-codbar.controller';

@Module({
  controllers: [ProductCodbarController],
  providers: [ProductCodbarService],
})
export class ProductCodbarModule {}
