import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Nikelodeon' })
  name: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ example: 'qwasdjn346945-23456-2345-234sdwfsd' })
  brandId: string;
}
