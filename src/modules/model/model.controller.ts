import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  async getModels(): Promise<Model[]> {
    return this.modelService.getModels();
  }

  @Get('brand/:brandId')
  async getModelsByBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ): Promise<Model[]> {
    return this.modelService.getModelsByBrand(brandId);
  }

  @Get('id')
  async getModelById(@Param('id', ParseUUIDPipe) id: string): Promise<Model> {
    return this.modelService.getModelById(id);
  }

  @Post()
  async createModel(@Body() model: CreateModelDto): Promise<Model> {
    return await this.modelService.createModel(model);
  }

  @Put('id')
  async updateModel(
    @Param('id', ParseUUIDPipe) id: string,
    model: UpdateModelDto,
  ): Promise<Model> {
    return await this.modelService.updateModel(id, model);
  }

  @Delete('id')
  async deleteModel(@Param('id', ParseUUIDPipe) id: string): Promise<Model> {
    return await this.modelService.deleteModel(id);
  }
}
