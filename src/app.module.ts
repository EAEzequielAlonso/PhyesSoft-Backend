import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { CommerceModule } from './modules/commerce/commerce.module';
import { ModelModule } from './modules/model/model.module';
import { ProductModule } from './modules/product/product.module';
import { ProviderModule } from './modules/provider/provider.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { UserModule } from './modules/user/user.module';
import { BranchModule } from './modules/branch/branch.module';
import { SaleProductsModule } from './modules/saleProducts/saleProducts.module';
import { SaleModule } from './modules/sale/sale.module';
import { SexService } from './modules/user/sex.service';
import { RoleService } from './modules/user/role.service';

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
  AuthModule, CommerceModule, ProductModule, UserModule, BranchModule, SaleProductsModule, SaleModule],
  controllers: [],
  providers: [SexService, RoleService],
})
export class AppModule {}
