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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommerceService } from './commerce.service';
import { Commerce } from './entities/commerce.entity';
import { CreateCommerceDto } from './dto/create-commerce.dto';
import { UpdateCommerceDto } from './dto/update-commerce.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/Auth.guard';

@ApiTags('Commerces')
@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCommerce(@Req() req: Request): Promise<Commerce> {
    console.log("req.user.commerce.id ", req.user.commerce.id )
    return await this.commerceService.getCommerce(req.user.commerce.id);
  }

  // @Get("user/:userId")
  //   async getCommerceByUserId (@Req() request: Request): Promise<Commerce[]> {
  //   return await this.commerceService.getCommerceByUserId(request.user.)
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

  @Put()
  async updateCommerce(
    @Req() req: Request,
    @Body() commerce: UpdateCommerceDto,
  ): Promise<string> {
    return await this.commerceService.updateCommerce(req.user.commerce.id, commerce);
  }

  // @Delete(":id")
  // async deleteCommerce(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
  //   return await this.commerceService.deleteCommerce(id);
  // }
}
