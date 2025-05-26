import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRepository } from './provider.repository';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderRepository],
})
export class ProviderModule {}
