import { Module } from '@nestjs/common';
import { PreloadsService } from './preloads.service';
import { PreloadsController } from './preloads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../user/entities/role.entity';
import { Sex } from '../user/entities/sex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Sex])],
  controllers: [PreloadsController],
  providers: [PreloadsService],
})
export class PreloadsModule {}
