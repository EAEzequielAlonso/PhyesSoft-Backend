import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  buyUnit: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  saleUnit: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  cost: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  profit: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  hasColor: boolean;

  @IsBoolean()
  @IsOptional()
  isPackComp: boolean;

  @IsBoolean()
  @IsOptional()
  isSellable: boolean;

  @IsBoolean()
  @IsOptional()
  isBuyable: boolean;

  @IsBoolean()
  @IsOptional()
  isInsumo: boolean;

  @IsBoolean()
  @IsOptional()
  isRawMaterial: boolean;

  @IsUUID()
  @IsOptional()
  subcategoryId: string;

  @IsUUID()
  @IsOptional()
  modelId: string;

  @IsUUID()
  @IsOptional()
  variantId: string;

  @IsUUID()
  @IsOptional()
  categoryId: string;

  @IsUUID()
  @IsOptional()
  brandId: string;

  @IsUUID()
  @IsOptional()
  sizetypeId: string;

  @IsUUID()
  @IsOptional()
  providerId: string;

  @IsUUID()
  @IsOptional()
  producttypeId: string;

  @IsUUID()
  @IsOptional()
  ivaSaleId: string;

  @IsUUID()
  @IsOptional()
  ivaBuyId: string;

}
