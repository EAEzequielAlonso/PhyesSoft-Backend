import { Injectable } from '@nestjs/common';
import { CreatePaymentSaleDto } from './dto/create-payment-sale.dto';
import { UpdatePaymentSaleDto } from './dto/update-payment-sale.dto';

@Injectable()
export class PaymentSalesService {
  create(createPaymentSaleDto: CreatePaymentSaleDto) {
    return 'This action adds a new paymentSale';
  }

  findAll() {
    return `This action returns all paymentSales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentSale`;
  }

  update(id: number, updatePaymentSaleDto: UpdatePaymentSaleDto) {
    return `This action updates a #${id} paymentSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentSale`;
  }
}
