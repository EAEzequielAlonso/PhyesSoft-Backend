import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query, ParseUUIDPipe } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { Request } from 'express';
import { Color } from './entities/color.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('color') 
@UseGuards(AuthGuard)
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  @ApiBearerAuth()
  async findAll(
      @Req() req: Request, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[Color[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.colorService.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Color> {
    return await this.colorService.findOne(id);
  }
 
  @Post()
  async create(@Body() color: CreateColorDto, @Req() req:Request): Promise<Color> {
      return await this.colorService.create({...color, commerceId: req.user.commerce.id});
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.colorService.remove(id);
  }
}
