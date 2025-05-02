import { Module } from '@nestjs/common';
import { BoxCashService } from './box-cash.service';
import { BoxCashController } from './box-cash.controller';

@Module({
  controllers: [BoxCashController],
  providers: [BoxCashService],
})
export class BoxCashModule {}
