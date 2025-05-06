import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, ParseUUIDPipe, Put, Req } from '@nestjs/common'; 
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CashMovementService } from './cash-movement.service';
import { CashMovement } from './entities/cash-movement.entity';
import { CreateCashMovementDto } from './dto/create-cash-movement.dto';
import { UpdateCashMovementDto } from './dto/update-cash-movement.dto';
import { Request } from 'express';

@Controller('cash-movement')  
@UseGuards(AuthGuard)
export class CashMovementController {
  constructor(private readonly service: CashMovementService) {}

  @Get()
  @ApiBearerAuth() 
  async findAll(
      @Query('dailyCashId') dailyCashId, 
      @Query('page') page = '1',
      @Query('limit') limit = '10',
      @Query('search') search = ''): Promise<[CashMovement[], number]> {

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.service.findAll(
      dailyCashId,
      pageNumber,
      limitNumber,
      search);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CashMovement> {
    return await this.service.findOne(id);
  }
 
  @Post()
  async create(@Body() body: CreateCashMovementDto, @Req() req: Request): Promise<CashMovement> {
      return await this.service.create({...body, userCreateMovId: req.user?.id});
    }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCashMovementDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
} 
