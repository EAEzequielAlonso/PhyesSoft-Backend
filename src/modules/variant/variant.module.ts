import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import {VariantRepository } from './variant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Variant])],
  controllers: [VariantController],
  providers: [VariantService, VariantRepository],
})
export class VariantModule {}
