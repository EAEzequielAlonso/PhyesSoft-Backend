import { Injectable } from '@nestjs/common';
import { CreateFiscalDatumDto } from './dto/create-fiscal-data.dto';
import { UpdateFiscalDatumDto } from './dto/update-fiscal-data.dto';

@Injectable()
export class FiscalDataService {
  create(createFiscalDatumDto: CreateFiscalDatumDto) {
    return 'This action adds a new fiscalDatum';
  }

  findAll() {
    return `This action returns all fiscalData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fiscalDatum`;
  }

  update(id: number, updateFiscalDatumDto: UpdateFiscalDatumDto) {
    return `This action updates a #${id} fiscalDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} fiscalDatum`;
  }
}
