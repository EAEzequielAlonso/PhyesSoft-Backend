import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductPackService } from './product-pack.service';
import { ProductPack } from './entities/product-pack.entity';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { CreateProductPackDto } from './dto/create-product-pack.dto';
import { UpdateProductPackDto } from './dto/update-product-pack.dto';

@Controller('product-pack')
@UseGuards(AuthGuard)
export class ProductPackController {
  constructor(private readonly service: ProductPackService) {}

  // GET /product-pack/by-pack/:productpackId
  @Get('components/:productpackId')
  async findByProductPack(
    @Param('productpackId') productpackId: string,
  ): Promise<ProductPack[]> {
    return this.service.findByProductPack(productpackId);
  }

  // GET /product-pack/:productpackId/:productcompId
  @Get(':productpackId/:productcompId')
  async findOne(
    @Param('productpackId') productpackId: string,
    @Param('productcompId') productcompId: string,
  ): Promise<ProductPack> {
    return this.service.findOne(productpackId, productcompId);
  }

  // POST /product-pack
  @Post()
  async create(@Body() body: CreateProductPackDto): Promise<ProductPack> {
    return this.service.create(body);
  }

  // PUT /product-pack/:productpackId/:productcompId
  @Put(':productpackId/:productcompId')
  async update(
    @Param('productpackId') productpackId: string,
    @Param('productcompId') productcompId: string,
    @Body() body: UpdateProductPackDto,
  ) {
    return this.service.update(productpackId, productcompId, body);
  }

  // DELETE /product-pack/:productpackId/:productcompId
  @Delete(':productpackId/:productcompId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('productpackId') productpackId: string,
    @Param('productcompId') productcompId: string,
  ) {
    await this.service.remove(productpackId, productcompId);
  }
}
