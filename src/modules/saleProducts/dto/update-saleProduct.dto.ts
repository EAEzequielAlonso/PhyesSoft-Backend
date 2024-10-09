import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleProductDto } from './create-saleProduct.dto';

export class UpdateSaleProductDto extends PartialType(CreateSaleProductDto) {}
