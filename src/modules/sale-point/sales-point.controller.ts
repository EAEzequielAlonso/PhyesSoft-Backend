import { Controller, Get, Post, Body, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { CreateSalesPointDto } from './dto/create-sales-point.dto'; 
import { UpdateSalesPointDto } from './dto/update-sales-point.dto'; 
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SalePointService } from './sales-point.service';
import { SalePoint } from './entities/sales-point.entity';

@Controller('sale-point')  
@UseGuards(AuthGuard)
export class SalePointController {
  constructor(private readonly service: SalePointService) {}

  @Get()
  @ApiBearerAuth() 
  async findAll(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[SalePoint[], number]> {

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search);
  }

  @Get('commerce')
  async findCommerce(@Req() req: Request): Promise<SalePoint[]> {
    return await this.service.findCommerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SalePoint> {
    return await this.service.findOne(id);
  }
 
  @Post()
  async create(@Body() body: CreateSalesPointDto, @Req() req:Request): Promise<SalePoint> {
      return await this.service.create(body);
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateSalesPointDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
