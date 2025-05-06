import { Module } from '@nestjs/common';
import { DailyCashService } from './daily-cash.service';
import { DailyCashController } from './daily-cash.controller';
import { DailyCashRepository } from './daily-cash.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyCash } from './entities/daily-cash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyCash])],
  controllers: [DailyCashController],
  providers: [DailyCashService, DailyCashRepository],
})
export class DailyCashModule {}
