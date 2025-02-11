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
import { ApiTags } from '@nestjs/swagger';
import { CommerceService } from './commerce.service';
import { Commerce } from './entities/commerce.entity';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';

@ApiTags('Commerces')
@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Get()
  async getCommerce(): Promise<Commerce> {
    return await this.commerceService.getCommerce();
  }

  // @Get("user/:userId")
  // async getCommerceByUserId (@Param("id", ParseUUIDPipe) userId: string): Promise<Commerce[]> {
  //   return await this.commerceService.getCommerceByUserId(userId)
  // }

  // @Get(":id")
  // async getCommerceById (@Param("id", ParseUUIDPipe) id: string): Promise<Commerce> {
  //   return await this.commerceService.getCommerceById(id)
  // }

  // @Post()
  // async createCommerce(@Body() commerce: CreateCommerceDto): Promise<Commerce> {
  //   return await this.commerceService.createCommerce(commerce);
  // }

  // @Put("unsubscribe/:id")
  // async unsubscribeCommerce(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
  //   return await this.commerceService.unsubscribeCommerce(id);
  // }

  @Put(':id')
  async updateCommerce(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() commerce: UpdateCommerceDto,
  ): Promise<string> {
    return await this.commerceService.updateCommerce(id, commerce);
  }

  // @Delete(":id")
  // async deleteCommerce(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
  //   return await this.commerceService.deleteCommerce(id);
  // }
}
