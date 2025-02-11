import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: '11111111' })
  @IsNotEmpty()
  @IsNumber()
  dni: number;

  @ApiProperty({ example: 'Prueba@0' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
