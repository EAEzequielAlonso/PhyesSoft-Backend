import { Module } from '@nestjs/common';
import { ValueVariantService } from './value-variant.service';
import { ValueVariantController } from './value-variant.controller';

@Module({
  controllers: [ValueVariantController],
  providers: [ValueVariantService],
})
export class ValueVariantModule {}
