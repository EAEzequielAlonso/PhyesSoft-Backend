import { Module } from '@nestjs/common';
import { BoxCashService } from './box-cash.service';
import { BoxCashController } from './box-cash.controller';
import { BoxCashRepository } from './box-cash.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxCash } from './entities/box-cash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoxCash])],
  controllers: [BoxCashController],
  providers: [BoxCashService, BoxCashRepository],
})
export class BoxCashModule {}
