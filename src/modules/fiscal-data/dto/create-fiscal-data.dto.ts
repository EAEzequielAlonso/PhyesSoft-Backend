import {
    IsString,
    IsEnum,
    IsDateString,
    IsOptional,
    Length,
    IsNotEmpty,
    Matches,
  } from 'class-validator';
import { ConditionIVA, TicketType } from '../Enums/enumsFiscal';
  
  export class CreateFiscalDataDto {
    @IsString()
    @Length(1, 100)
    name: string;
  
    @IsString()
    @Length(11, 11)
    @IsNotEmpty()
    @Matches(/^\d{11}$/, { message: 'CUIT debe tener exactamente 11 dígitos numéricos' })
    cuit: string;
  
    @IsEnum(ConditionIVA)
    conditionIva: ConditionIVA;
  
    @IsString()
    @Length(1, 200)
    addressCommerce: string;
  
    @IsDateString()
    initActivity: Date;
  
    @IsString()
    @Length(1, 20)
    ingresosBrutos: string;
  
    @IsEnum(TicketType)
    ticketType: TicketType;
  
    @IsOptional()
    @IsString()
    @Length(1, 100)
    aliasFacturacion?: string;
  }
