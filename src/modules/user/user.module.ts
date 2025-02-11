import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/role.entity';
import { Sex } from './entities/sex.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole, Sex])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, TypeOrmModule.forFeature([User, UserRole, Sex])],
})
export class UserModule {}
