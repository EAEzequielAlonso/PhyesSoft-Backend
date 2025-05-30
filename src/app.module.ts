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
import { PreloadsModule } from './modules/preloads/preloads.module';
import { ColorModule } from './modules/color/color.module';
import { SizeModule } from './modules/size/size.module';
import { SizeTypeModule } from './modules/size-type/size-type.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { MovementTypeModule } from './modules/movement-type/movement-type.module';
import { SalePointModule } from './modules/sale-point/sales-point.module';
import { FiscalDataModule } from './modules/fiscal-data/fiscal-data.module';
import { BoxCashModule } from './modules/box-cash/box-cash.module';
import { DailyCashModule } from './modules/daily-cash/daily-cash.module';
import { CashMovementModule } from './modules/cash-movement/cash-movement.module';
import { VariantModule } from './modules/variant/variant.module';
import { ProductPackModule } from './modules/product-pack/product-pack.module';
import { ValueVariantModule } from './modules/value-variant/value-variant.module';
import { IvaModule } from './modules/iva/iva.module';
import { TaxModule } from './modules/tax/tax.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    // modulo para generar los token
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '5h' },
      secret: process.env.JWT_SECRET,
    }),
    PreloadsModule,
    AuthModule,
    CommerceModule,
    ProductModule,
    UserModule,
    BranchModule,
    SaleProductsModule,
    SaleModule,
    BrandModule,
    CategoryModule,
    ColorModule,
    ModelModule,
    ProviderModule,
    SizeModule,
    SubcategoryModule,
    SizeTypeModule,
    PaymentMethodModule,
    MovementTypeModule,
    SalePointModule,
    FiscalDataModule,
    BoxCashModule,
    DailyCashModule,
    CashMovementModule,
    VariantModule,
    ProductPackModule,
    ValueVariantModule,
    IvaModule,
    TaxModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
