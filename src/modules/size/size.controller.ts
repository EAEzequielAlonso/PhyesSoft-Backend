import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  async getSizes (): Promise<Size[]> {
    return this.sizeService.getSizes();
  }

  @Get("id")
  async getSizeById (@Param("id", ParseUUIDPipe) id:string): Promise<Size> {
      return this.sizeService.getSizeById(id);
  }

  @Post()
  async createSize (@Body() size: CreateSizeDto): Promise<Size> {
      return await this.sizeService.createSize(size);
  }

  @Put("id")
  async updateSize (@Param("id", ParseUUIDPipe) id:string, size: UpdateSizeDto): Promise<Size> {
    return await this.sizeService.updateSize(id, size);
  }

  @Delete("id")
  async deleteSize (@Param("id", ParseUUIDPipe) id:string): Promise<Size> {
    return await this.sizeService.deleteSize (id);
  }  
}
