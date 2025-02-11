import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getBrands(): Promise<Brand[]> {
    return this.brandService.getBrands();
  }

  @Get('id')
  async getBrandById(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    return this.brandService.getBrandById(id);
  }

  @Post()
  async createBrand(@Body() brand: CreateBrandDto): Promise<Brand> {
    return await this.brandService.createBrand(brand);
  }

  @Put('id')
  async updateBrand(
    @Param('id', ParseUUIDPipe) id: string,
    brand: UpdateBrandDto,
  ): Promise<Brand> {
    return await this.brandService.updateBrand(id, brand);
  }

  @Delete('id')
  async deleteBrand(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    return await this.brandService.deleteBrand(id);
  }
}
