import { Module } from '@nestjs/common';
import { PaymentSalesService } from './payment-sales.service';
import { PaymentSalesController } from './payment-sales.controller';

@Module({
  controllers: [PaymentSalesController],
  providers: [PaymentSalesService],
})
export class PaymentSalesModule {}
