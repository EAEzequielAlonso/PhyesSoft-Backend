import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  async getColors (): Promise<Color[]> {
    return this.colorService.getColors();
  }

  @Get("id")
  async getColorById (@Param("id", ParseUUIDPipe) id:string): Promise<Color> {
      return this.colorService.getColorById(id);
  }

  @Post()
  async createColor (@Body() color: CreateColorDto): Promise<Color> {
      return await this.colorService.createColor(color);
  }

  @Put("id")
  async updateColor (@Param("id", ParseUUIDPipe) id:string, color: UpdateColorDto): Promise<Color> {
    return await this.colorService.updateColor(id, color);
  }

  @Delete("id")
  async deleteColor (@Param("id", ParseUUIDPipe) id:string): Promise<Color> {
    return await this.colorService.deleteColor (id);
  } 

}
