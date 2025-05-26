import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCodbarDto } from './create-product-codbar.dto';

export class UpdateProductCodbarDto extends PartialType(CreateProductCodbarDto) {}
