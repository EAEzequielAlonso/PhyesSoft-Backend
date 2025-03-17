import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Remeras' })
  name: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'sdg356dfh-345tty-3457-3456dfhfgjh' })
  categoryId: string;
}
