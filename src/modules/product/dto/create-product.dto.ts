import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class searchDto {
  name:string = "";
  categoryId: string = "";
  brandId:string = "";
  sizeTypeId:string = "";
}

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
  @IsNotEmpty()
  @ApiProperty()
  cost: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  profit: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date;

  @IsUUID() @IsOptional() @ApiProperty()
  subcategoryId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  modelId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  categoryId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  brandId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  sizeTypeId:string;

  @IsUUID() @IsOptional() @ApiProperty()
  commerceId:string;

}
