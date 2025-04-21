import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCommerceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameFantacy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nameCompany: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  emailCompany: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
