import { Controller, Get, Post, Body, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BoxCashService } from './box-cash.service';
import { BoxCash } from './entities/box-cash.entity';
import { CreateBoxCashDto } from './dto/create-box-cash.dto';
import { UpdateBoxCashDto } from './dto/update-box-cash.dto';

@Controller('box-cash')  
@UseGuards(AuthGuard)
export class BoxCashController {
  constructor(private readonly service: BoxCashService) {}

  @Get()
  @ApiBearerAuth() 
  async findAll(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[BoxCash[], number]> {

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search);
  }

  @Get('commerce')
  async findCommerce(@Req() req: Request): Promise<BoxCash[]> {
    return await this.service.findCommerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<BoxCash> {
    return await this.service.findOne(id);
  }
 
  @Post()
  async create(@Body() body: CreateBoxCashDto): Promise<BoxCash> {
      return await this.service.create(body);
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateBoxCashDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
