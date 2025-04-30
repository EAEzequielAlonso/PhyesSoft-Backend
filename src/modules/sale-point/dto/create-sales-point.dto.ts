import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class CreateSalesPointDto {
  @IsString()
  @Matches(/^\d{4}$/, { message: 'El código debe tener 4 dígitos, por ejemplo "0001"' })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['ELECTRONICO', 'FISCAL', 'MANUAL'], {
    message: 'emitionType debe ser ELECTRONICO, FISCAL o MANUAL',
  })
  @IsOptional()
  emitionType?: 'ELECTRONICO' | 'FISCAL' | 'MANUAL';

  @IsUUID()
  @IsOptional()
  branchId?: string;
}
