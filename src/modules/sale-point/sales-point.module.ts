import { Module } from '@nestjs/common';
import { SalePointService } from './sales-point.service';
import { SalePointController } from './sales-point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalePoint } from './entities/sales-point.entity';
import { SalePointRepository } from './sales-point.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SalePoint])],
  controllers: [SalePointController],
  providers: [SalePointService, SalePointRepository],
})
export class SalePointModule {}
