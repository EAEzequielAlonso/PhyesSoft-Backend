import { Module } from '@nestjs/common';
import { ValueVariantService } from './value-variant.service';
import { ValueVariantController } from './value-variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValueVariant } from './entities/value-variant.entity';
import { ValueVariantRepository } from './value-variant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ValueVariant])],
  controllers: [ValueVariantController],
  providers: [ValueVariantService, ValueVariantRepository],
})
export class ValueVariantModule {}
