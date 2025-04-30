import { PartialType } from '@nestjs/swagger';
import { CreateFiscalDataDto } from './create-fiscal-data.dto';

export class UpdateFiscalDatumDto extends PartialType(CreateFiscalDataDto) {}
