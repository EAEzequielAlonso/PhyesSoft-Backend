import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Req,
  UseGuards,
  ForbiddenException,
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
@UseGuards(AuthGuard)
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCommerce(@Req() req: Request): Promise<Commerce> {
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

  @Put(":id")
  async updateCommerce(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() commerce: UpdateCommerceDto,
  ): Promise<string> {
    if (id === req.user.commerce.id)
       return await this.commerceService.updateCommerce(id, commerce);
    throw new ForbiddenException("No esta autorizado a modificar este comercio")
  }

  // @Delete(":id")
  // async deleteCommerce(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
  //   return await this.commerceService.deleteCommerce(id);
  // }
}
