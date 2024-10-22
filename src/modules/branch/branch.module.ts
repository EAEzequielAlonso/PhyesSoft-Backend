import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { BranchRepository } from './branch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Commerce } from '../commerce/entities/commerce.entity';
import { CommerceRepository } from '../commerce/commerce.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Commerce])],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository, CommerceRepository],
})
export class BranchModule {}
