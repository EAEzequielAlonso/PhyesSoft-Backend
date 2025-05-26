import { Module } from '@nestjs/common';
import { ProductPackService } from './product-pack.service';
import { ProductPackController } from './product-pack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPack } from './entities/product-pack.entity';
import { ProductPackRepository } from './product-pack.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPack])],
  controllers: [ProductPackController],
  providers: [ProductPackService, ProductPackRepository],
})
export class ProductPackModule {}
