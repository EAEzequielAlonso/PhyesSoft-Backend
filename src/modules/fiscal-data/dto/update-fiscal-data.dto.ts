import { PartialType } from '@nestjs/swagger';
import { CreateFiscalDataDto } from './create-fiscal-data.dto';

export class UpdateFiscalDataDto extends PartialType(CreateFiscalDataDto) {}
