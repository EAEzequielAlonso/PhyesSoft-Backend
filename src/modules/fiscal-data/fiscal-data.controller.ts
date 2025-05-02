import { Controller, Get, Post, Body, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FiscalDataService } from './fiscal-data.service';
import { FiscalData } from './entities/fiscal-data.entity';
import { CreateFiscalDataDto } from './dto/create-fiscal-data.dto';
import { UpdateFiscalDataDto } from './dto/update-fiscal-data.dto';
import { ConditionIVA, EmissionType, TicketType } from './Enums/enumsFiscal';

@Controller('fiscal-data')  
@UseGuards(AuthGuard)
export class FiscalDataController {
  constructor(private readonly service: FiscalDataService) {}
 
  @Get()
  @ApiBearerAuth() 
  async findAll(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[FiscalData[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search);
  }

  @Get('conditioniva')
  getCondicionIVA(): { id: string; name: string }[] {
    return Object.values(ConditionIVA).map(value => ({
      id: value,
      name: value,
    }));
  }

  @Get('tickettype')
  getTipoComprobante(): { id: string; name: string }[] {
    return Object.values(TicketType).map(value => ({
      id: value,
      name: value,
    }));
  }

  @Get('emissiontype')
  getEmissionType(): { id: string; name: string }[] {
    return Object.values(EmissionType).map(value => ({
      id: value,
      name: value,
    }));
  }

  @Get('commerce')
  async findCommerce(@Req() req: Request): Promise<FiscalData[]> {
    console.log("estamos en el controlaor fiscaldata commerce...")
    return await this.service.findCommerce(req.user.commerce.id);
  }
 
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<FiscalData> {
    return await this.service.findOne(id);
  }
 
  @Post()
  async create(@Body() body: CreateFiscalDataDto, @Req() req:Request): Promise<FiscalData> {
      console.log("asi llegan los datos: ", JSON.stringify(body))
      return await this.service.create({...body, commerceId: req.user.commerce.id});
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateFiscalDataDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
