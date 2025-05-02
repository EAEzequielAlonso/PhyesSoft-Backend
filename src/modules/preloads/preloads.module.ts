import { Module } from '@nestjs/common';
import { PreloadsService } from './preloads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../user/entities/role.entity';
import { Category } from '../category/entities/category.entity';
import { Subcategory } from '../subcategory/entities/subcategory.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { Color } from '../color/entities/color.entity';
import { Size } from '../size/entities/size.entity';
import { Product } from '../product/entities/product.entity';
import { Commerce } from '../commerce/entities/commerce.entity';
import { SizeType } from '../size-type/entities/size-type.entity';
import { FiscalData } from '../fiscal-data/entities/fiscal-data.entity';
import { Branch } from '../branch/entities/branch.entity';
import { SalePoint } from '../sale-point/entities/sales-point.entity';
import { PaymentMethod } from '../payment-method/entities/payment-method.entity';
import { MovementType } from '../movement-type/entities/movement-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole,
      Category,
      Subcategory,
      Brand,
      Model,
      Color,
      Size,
      Product,
      Commerce,
      SizeType,
      FiscalData,
      Branch,
      SalePoint,
      PaymentMethod,
      MovementType,
    ]),
  ],
  controllers: [],
  providers: [PreloadsService],
})
export class PreloadsModule {}
