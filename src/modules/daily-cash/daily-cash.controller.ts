import { Controller, Get, Post, Body, Param, Delete, UsePipes, UseGuards, ParseUUIDPipe, Req, Query, Put } from '@nestjs/common';
import { DailyCashService } from './daily-cash.service';
import { CreateDailyCashDto } from './dto/create-daily-cash.dto';
import { UpdateDailyCashDto } from './dto/update-daily-cash.dto';
import { ValidateOpenCashPipe } from './pipe/validate-open-cash.pipe';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { DailyCash } from './entities/daily-cash.entity';
import { Request } from 'express';

@Controller('daily-cash')
@UseGuards(AuthGuard)
export class DailyCashController {
    constructor(private readonly service: DailyCashService) {}
  
    @Get()
    async findAll(
        @Req() req: Request, 
        @Query('page') page = '1',
        @Query('limit') limit = '10',
        @Query('search') search = ''): Promise<[DailyCash[], number]> {
  
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
  
      return await this.service.findAll(
        req.user.commerce.id,
        pageNumber,
        limitNumber,
        search);
    }
  
    @Get('commerce')
    async findCommerce(@Req() req: Request): Promise<DailyCash[]> {
      return await this.service.findCommerce(req.user.commerce.id);
    }

    @Get('open-daily-cash')
    async findOpen(@Req() req: Request): Promise<DailyCash[]> {
      return await this.service.findOpen(req.user.commerce.id);
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<DailyCash> {
      return await this.service.findOne(id);
    }
   
    @Post()
    @UsePipes(ValidateOpenCashPipe)
    create(@Body() createDailyCashDto: CreateDailyCashDto, @Req() req: Request) {
      return this.service.create({...createDailyCashDto, userOpenId: req.user?.id});
    }
  
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateDailyCashDto) {
      return this.service.update(id, body);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.service.remove(id);
    }

}
