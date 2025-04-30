import { Module } from '@nestjs/common';
import { FiscalDataService } from './fiscal-data.service';
import { FiscalDataController } from './fiscal-data.controller';

@Module({
  controllers: [FiscalDataController],
  providers: [FiscalDataService],
})
export class FiscalDataModule {}
