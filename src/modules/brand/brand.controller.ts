import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { Request } from 'express';

@ApiTags('Brand')
@Controller('brand')
@UseGuards(AuthGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiBearerAuth()
  async findAll(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
  ): Promise<[Brand[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.brandService.findAll(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search,
    );
  }

  @Get('commerce')
  async findCommerce(@Req() req: Request): Promise<Brand[]> {
    return await this.brandService.findCommerce(req.user.commerce.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    return await this.brandService.findOne(id);
  }

  @Post()
  async create(
    @Body() brand: CreateBrandDto,
    @Req() req: Request,
  ): Promise<Brand> {
    return await this.brandService.create({
      ...brand,
      commerceId: req.user.commerce.id,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.remove(id);
  }
}
