import { ValueVariantService } from './value-variant.service';
import { CreateValueVariantDto } from './dto/create-value-variant.dto';
import { UpdateValueVariantDto } from './dto/update-value-variant.dto';
import { Controller, Get, Post, Body, Put, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ValueVariant } from './entities/value-variant.entity';

@Controller('value-variant') 
@UseGuards(AuthGuard) 
export class ValueVariantController { 
  constructor(private readonly service: ValueVariantService) {}

  @Get()
  async findAll(
        @Req() req: Request, 
        @Query('page') page = '1',
        @Query('limit') limit = '10',
        @Query('search') search = ''): Promise<[ValueVariant[], number]> {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        
        return await this.service.findAll(
          req.user.commerce.id,
          pageNumber,
          limitNumber,
          search);
  }

  @Post()
  async create(@Body() body: CreateValueVariantDto): Promise<ValueVariant> {
    return await this.service.create(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateValueVariantDto) {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
