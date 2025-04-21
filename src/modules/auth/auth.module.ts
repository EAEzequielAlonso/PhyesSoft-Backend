import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CommerceRepository } from '../commerce/commerce.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from '../commerce/entities/commerce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commerce]) , UserModule],
  controllers: [AuthController],
  providers: [AuthService, CommerceRepository],
})
export class AuthModule {}
