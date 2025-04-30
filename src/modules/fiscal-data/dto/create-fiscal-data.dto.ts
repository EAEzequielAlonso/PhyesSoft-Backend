import {
    IsString,
    IsEnum,
    IsDateString,
    IsOptional,
    Length,
  } from 'class-validator';
import { CondicionIVA, TipoComprobante } from '../entities/fiscal-data.entity';
  
  export class CreateFiscalDataDto {
    @IsString()
    @Length(1, 100)
    razonSocial: string;
  
    @IsString()
    @Length(11, 20) // CUIT suele tener 11 dígitos
    cuit: string;
  
    @IsEnum(CondicionIVA)
    condicionIva: CondicionIVA;
  
    @IsString()
    @Length(1, 200)
    domicilioComercial: string;
  
    @IsDateString()
    inicioActividad: Date;
  
    @IsString()
    @Length(1, 20)
    ingresosBrutos: string;
  
    @IsEnum(TipoComprobante)
    tipoComprobante: TipoComprobante;
  
    @IsOptional()
    @IsString()
    @Length(1, 100)
    aliasFacturacion?: string;
  }
