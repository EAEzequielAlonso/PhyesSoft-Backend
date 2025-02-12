import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentSalesService } from './payment-sales.service';
import { CreatePaymentSaleDto } from './dto/create-payment-sale.dto';
import { UpdatePaymentSaleDto } from './dto/update-payment-sale.dto';

@Controller('payment-sales')
export class PaymentSalesController {
  constructor(private readonly paymentSalesService: PaymentSalesService) {}

  @Post()
  create(@Body() createPaymentSaleDto: CreatePaymentSaleDto) {
    return this.paymentSalesService.create(createPaymentSaleDto);
  }

  @Get()
  findAll() {
    return this.paymentSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentSaleDto: UpdatePaymentSaleDto) {
    return this.paymentSalesService.update(+id, updatePaymentSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSalesService.remove(+id);
  }
}
