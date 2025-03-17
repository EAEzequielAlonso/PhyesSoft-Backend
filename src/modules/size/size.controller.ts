import { Controller, Get, Post, Body, Put, Param, Delete, Req, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Request } from 'express';
import { Size } from './entities/size.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('size') 
@UseGuards(AuthGuard) 
export class SizeController { 
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  async findAll(
        @Req() req: Request, 
        @Query('page') page = '1',
        @Query('limit') limit = '10',
        @Query('name') name = '',
        @Query('optionId') optionId = '',
        @Query('sortField') sortField = 'name',
        @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc', ): Promise<[Size[], number]> {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        
        return await this.sizeService.findAll(
          req.user.commerce.id,
          pageNumber,
          limitNumber,
          name,
          optionId,
          sortField,
          sortOrder);
  }

  @Post()
  async create(@Body() size: CreateSizeDto): Promise<Size> {
    return await this.sizeService.create(size);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sizeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSizeDto: UpdateSizeDto) {
    console.log("updateSizeDto: ", updateSizeDto)
    return await this.sizeService.update(id, updateSizeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sizeService.remove(id);
  }
}
