import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'herz@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Prueba@0' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'MiComercio' })
  @IsNotEmpty()
  @IsString()
  commerce: string;

}
