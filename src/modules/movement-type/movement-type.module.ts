import { Module } from '@nestjs/common';
import { MovementTypeService } from './movement-type.service';
import { MovementTypeController } from './movement-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementType } from './entities/movement-type.entity';
import { MovementTypeRepository } from './movement-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovementType])],
  controllers: [MovementTypeController],
  providers: [MovementTypeService, MovementTypeRepository],
})
export class MovementTypeModule {}
