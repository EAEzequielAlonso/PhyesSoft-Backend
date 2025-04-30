import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FiscalDataService } from './fiscal-data.service';
import { CreateFiscalDatumDto } from './dto/create-fiscal-data.dto';
import { UpdateFiscalDatumDto } from './dto/update-fiscal-data.dto';

@Controller('fiscal-data')
export class FiscalDataController {
  constructor(private readonly fiscalDataService: FiscalDataService) {}

  @Post()
  create(@Body() createFiscalDatumDto: CreateFiscalDatumDto) {
    return this.fiscalDataService.create(createFiscalDatumDto);
  }

  @Get()
  findAll() {
    return this.fiscalDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiscalDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiscalDatumDto: UpdateFiscalDatumDto) {
    return this.fiscalDataService.update(+id, updateFiscalDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fiscalDataService.remove(+id);
  }
}
