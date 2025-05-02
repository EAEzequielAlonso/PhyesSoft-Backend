import { PartialType } from '@nestjs/mapped-types';
import { CreateBoxCashDto } from './create-box-cash.dto';

export class UpdateBoxCashDto extends PartialType(CreateBoxCashDto) {}
