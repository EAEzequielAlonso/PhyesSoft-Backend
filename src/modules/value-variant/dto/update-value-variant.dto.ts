import { PartialType } from '@nestjs/mapped-types';
import { CreateValueVariantDto } from './create-value-variant.dto';

export class UpdateValueVariantDto extends PartialType(CreateValueVariantDto) {}
