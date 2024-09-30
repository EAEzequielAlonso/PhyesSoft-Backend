import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({example: 'example@example.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({example: 'Prueba@0'})
  @IsNotEmpty()
  @IsString()
  password: string;
}
