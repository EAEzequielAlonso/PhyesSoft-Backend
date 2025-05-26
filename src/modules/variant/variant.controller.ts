import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { VariantService } from './variant.service';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('variant')
@UseGuards(AuthGuard)
export class VariantController {
  constructor(private readonly service: VariantService) {}

  @Get()
  @ApiBearerAuth()
  async findAll(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
  ): Promise<[Variant[], number]> {
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
  async findCemmerce(@Req() req: Request): Promise<Variant[]> {
    return await this.service.findCemmerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Variant> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(
    @Body() body: CreateVariantDto,
    @Req() req: Request,
  ): Promise<Variant> {
    return await this.service.create({
      ...body,
      commerceId: req.user.commerce.id,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateVariantDto,
  ) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
