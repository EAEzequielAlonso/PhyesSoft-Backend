import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Talles Kids' })
  name: string;
}
