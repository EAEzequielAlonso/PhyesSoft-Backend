import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { EmissionType } from 'src/modules/fiscal-data/Enums/enumsFiscal';

export class CreateSalesPointDto {
  @IsString()
  @Matches(/^\d{4}$/, {
    message: 'El código debe tener 4 dígitos, por ejemplo "0001"',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(EmissionType, {
    message: 'emitionType debe ser ELECTRONICO, FISCAL o MANUAL',
  })
  @IsOptional()
  emissionType?: EmissionType;

  @IsString()
  @IsNotEmpty()
  fiscalDataId: string;
}
