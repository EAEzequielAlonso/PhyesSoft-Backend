import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../user/entities/role.entity';
import { Sex } from '../user/entities/sex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Sex])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
