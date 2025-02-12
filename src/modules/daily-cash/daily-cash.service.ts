import { Injectable } from '@nestjs/common';
import { CreateDailyCashDto } from './dto/create-daily-cash.dto';
import { UpdateDailyCashDto } from './dto/update-daily-cash.dto';

@Injectable()
export class DailyCashService {
  create(createDailyCashDto: CreateDailyCashDto) {
    return 'This action adds a new dailyCash';
  }

  findAll() {
    return `This action returns all dailyCash`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyCash`;
  }

  update(id: number, updateDailyCashDto: UpdateDailyCashDto) {
    return `This action updates a #${id} dailyCash`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyCash`;
  }
}
