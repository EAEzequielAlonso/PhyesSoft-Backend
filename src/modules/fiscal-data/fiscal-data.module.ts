import { Module } from '@nestjs/common';
import { FiscalDataService } from './fiscal-data.service';
import { FiscalDataController } from './fiscal-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiscalData } from './entities/fiscal-data.entity';
import { FiscalDataRepository } from './fiscal-data.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FiscalData])],
  controllers: [FiscalDataController],
  providers: [FiscalDataService, FiscalDataRepository],
})
export class FiscalDataModule {}
