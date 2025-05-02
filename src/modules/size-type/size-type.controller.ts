import { Controller, Get, Post, Body, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { SizeTypeService } from './size-type.service';
import { CreateSizeTypeDto } from './dto/create-size-type.dto';
import { UpdateSizeTypeDto } from './dto/update-size-type.dto';
import { SizeType } from './entities/size-type.entity';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sizetype')  
@UseGuards(AuthGuard)
export class SizeTypeController {
  constructor(private readonly service: SizeTypeService) {}
 
  @Get()
  @ApiBearerAuth() 
  async findAll(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[SizeType[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search);
  }

  @Get('commerce')
  async findCemmerce(@Req() req: Request): Promise<SizeType[]> {
    return await this.service.findCemmerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<SizeType> {
    return await this.service.findOne(id);
  }
 
  @Post()
  async create(@Body() sizeTipe: CreateSizeTypeDto, @Req() req:Request): Promise<SizeType> {
      return await this.service.create({...sizeTipe, commerceId: req.user.commerce.id});
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() sizeTipe: UpdateSizeTypeDto) {
    return this.service.update(id, sizeTipe);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
