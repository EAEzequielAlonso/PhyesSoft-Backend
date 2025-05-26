import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { MovementTypeService } from './movement-type.service';
import { CreateMovementTypeDto } from './dto/create-movement-type.dto';
import { UpdateMovementTypeDto } from './dto/update-movement-type.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MovementType } from './entities/movement-type.entity';
import { Request } from 'express';

@Controller('movement-type')
@UseGuards(AuthGuard)
export class MovementTypeController {
  constructor(private readonly service: MovementTypeService) {}

  @Get()
  @ApiBearerAuth()
  async findAll(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
  ): Promise<[MovementType[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.service.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search,
    );
  }

  @Get('commerce')
  async findCemmerce(@Req() req: Request): Promise<MovementType[]> {
    return await this.service.findCemmerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<MovementType> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() method: CreateMovementTypeDto,
    @Req() req: Request,
  ): Promise<MovementType> {
    console.log(`esto llega al controlador ${JSON.stringify(method)}`);
    return await this.service.create({
      ...method,
      commerceId: req.user.commerce.id,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() method: UpdateMovementTypeDto,
  ) {
    return this.service.update(id, method);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
