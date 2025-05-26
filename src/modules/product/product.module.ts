import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repositor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductType } from './entities/product-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductType])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
