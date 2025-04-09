import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  @ApiProperty()
  cost: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  @ApiProperty()
  profit: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsUUID() @IsOptional() @ApiProperty()
  subcategoryId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  modelId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  categoryId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  brandId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  sizetypeId:string;

}
