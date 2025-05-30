import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  emailBranch: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  initDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  central: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  fiscalDataId: string;
}
