import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { UpdateResult } from 'typeorm';

@Controller('model')
@UseGuards(AuthGuard)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getModels(
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search = '',
  ): Promise<[Model[], number]> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return await this.modelService.getModels(
      req.user.commerce.id,
      pageNumber,
      limitNumber,
      search,
    );
  }

  @Get('commerce')
  async getModelCommerce(@Req() req: Request): Promise<Model[]> {
    return await this.modelService.getModelCommerce(req.user.commerce.id);
  }

  @Get('brand/:brandId')
  async getModelsByBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ): Promise<Model[]> {
    return this.modelService.getModelsByBrand(brandId);
  }

  @Get(':id')
  async getModelById(@Param('id', ParseUUIDPipe) id: string): Promise<Model> {
    return this.modelService.getModelById(id);
  }

  @Post()
  async createModel(@Body() model: CreateModelDto): Promise<Model> {
    return await this.modelService.createModel(model);
  }

  @Put(':id')
  async updateModel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() model: UpdateModelDto,
  ): Promise<UpdateResult> {
    return await this.modelService.updateModel(id, model);
  }

  @Delete(':id')
  async deleteModel(@Param('id', ParseUUIDPipe) id: string): Promise<Model> {
    return await this.modelService.deleteModel(id);
  }
}
