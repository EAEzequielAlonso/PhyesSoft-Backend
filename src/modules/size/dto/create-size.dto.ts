import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Indumentaria' })
  name: string;

  @IsUUID()
  @IsNotEmpty()
  sizetypeId: string;
}
