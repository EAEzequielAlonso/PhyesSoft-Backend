import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ClientModule } from './modules/client/client.module';
import { CommerceModule } from './modules/commerce/commerce.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ModelModule } from './modules/model/model.module';
import { ProductModule } from './modules/product/product.module';
import { ProviderModule } from './modules/provider/provider.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),

    // modulo para generar los token
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '5h' },
      secret: process.env.JWT_SECRET,
    }),
  AuthModule, BrandModule, CategoryModule, ClientModule, CommerceModule, EmployeeModule, ModelModule, 
ProductModule, ProviderModule, SubcategoryModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
