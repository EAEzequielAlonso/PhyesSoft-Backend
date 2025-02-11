import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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
  @IsNotEmpty()
  @ApiProperty()
  emailBranch: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  image: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  InitDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  createAt: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  central: boolean;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  commerceId: string;
}
