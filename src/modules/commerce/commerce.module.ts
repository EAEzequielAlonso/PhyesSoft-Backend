import { Module } from '@nestjs/common';
import { CommerceService } from './commerce.service';
import { CommerceController } from './commerce.controller';
import { CommerceRepository } from './commerce.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './entities/commerce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commerce])],
  controllers: [CommerceController],
  providers: [CommerceService, CommerceRepository],
})
export class CommerceModule {}
