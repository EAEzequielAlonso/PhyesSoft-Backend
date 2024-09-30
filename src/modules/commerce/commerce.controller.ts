import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommerceService } from './commerce.service';
import { Commerce } from './entities/commerce.entity';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';

@ApiTags("Commerces")
@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Get()
  async getCommerces (): Promise<Commerce[]> {
    return await this.commerceService.getCommerces()
  }

  @Get(":id")
  async getCommerceById (@Param("id", ParseUUIDPipe) id: string): Promise<Commerce> {
    return await this.commerceService.getCommerceById(id)
  }

  @Post()
  async createCommerce(@Body() user: CreateCommerceDto): Promise<Commerce> {
    return await this.commerceService.createCommerce(user);
  }

  @Put("unsubscribe/:id")
  async unsubscribeCommerce(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.commerceService.unsubscribeCommerce(id);
  }

  @Put(":id")
  async updateCommerce(@Param("id", ParseUUIDPipe) id: string, @Body() user: UpdateCommerceDto): Promise<string> {
    return await this.commerceService.updateCommerce(id, user);
  }

  @Delete(":id")
  async deleteCommerce(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.commerceService.deleteCommerce(id);
  }

}
