import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaymentMethod } from './entities/payment-method.entity';
import { Request } from 'express';

@Controller('payment-method')
@UseGuards(AuthGuard)
export class PaymentMethodController {
  constructor(private readonly service: PaymentMethodService) {}

  @Get()
    @ApiBearerAuth()
    async findAll(
        @Req() req: Request, 
        @Query('page') page = '1',
        @Query('limit') limit = '10',
        @Query('search') search = ''): Promise<[PaymentMethod[], number]> {
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
      return await this.service.findAll(
        req.user.commerce.id,
        pageNumber,
        limitNumber,
        search);
    }
  
    @Get('commerce')
    async findCemmerce(@Req() req: Request): Promise<PaymentMethod[]> {
      return await this.service.findCemmerce(req.user.commerce.id);
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PaymentMethod> {
      return await this.service.findOne(id);
    }
   
    @Post()
    async create(@Body() method: CreatePaymentMethodDto, @Req() req:Request): Promise<PaymentMethod> {
        console.log (`esto llega al controlador ${JSON.stringify(method)}`)
        return await this.service.create({...method, commerceId: req.user.commerce.id});
      }
  
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() method: UpdatePaymentMethodDto) {
      return this.service.update(id, method);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.service.remove(id);
    }
}
