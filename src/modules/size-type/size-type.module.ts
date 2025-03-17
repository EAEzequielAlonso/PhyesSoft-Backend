import { Module } from '@nestjs/common';
import { SizeTypeService } from './size-type.service';
import { SizeTypeController } from './size-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeType } from './entities/size-type.entity';
import { SizeTypeRepository } from './size-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SizeType])],
  controllers: [SizeTypeController],
  providers: [SizeTypeService, SizeTypeRepository],
})
export class SizeTypeModule {}
