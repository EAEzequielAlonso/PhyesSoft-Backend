import { Module } from '@nestjs/common';
import { PreloadsService } from './preloads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../user/entities/role.entity';
import { Sex } from '../user/entities/sex.entity';
import { Category } from '../category/entities/category.entity';
import { Subcategory } from '../subcategory/entities/subcategory.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';
import { Color } from '../color/entities/color.entity';
import { Size } from '../size/entities/size.entity';
import { Product } from '../product/entities/product.entity';
import { Commerce } from '../commerce/entities/commerce.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole,
      Sex,
      Category,
      Subcategory,
      Brand,
      Model,
      Color,
      Size,
      Product,
      Commerce
    ]),
  ],
  controllers: [],
  providers: [PreloadsService],
})
export class PreloadsModule {}
