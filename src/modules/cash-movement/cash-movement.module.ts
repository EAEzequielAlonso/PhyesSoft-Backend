import { Module } from '@nestjs/common';
import { CashMovementService } from './cash-movement.service';
import { CashMovementController } from './cash-movement.controller';
import { CashMovementRepository } from './cash-movement.repository';
import { DailyCashRepository } from '../daily-cash/daily-cash.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashMovement } from './entities/cash-movement.entity';
import { DailyCash } from '../daily-cash/entities/daily-cash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashMovement, DailyCash])],
  controllers: [CashMovementController],
  providers: [CashMovementService, CashMovementRepository, DailyCashRepository],
})
export class CashMovementModule {}
