import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyCashDto } from './create-daily-cash.dto';

export class UpdateDailyCashDto extends PartialType(CreateDailyCashDto) {}
