import { Injectable } from '@nestjs/common';
import { CreateBoxCashDto } from './dto/create-box-cash.dto';
import { UpdateBoxCashDto } from './dto/update-box-cash.dto';

@Injectable()
export class BoxCashService {
  create(createBoxCashDto: CreateBoxCashDto) {
    return 'This action adds a new boxCash';
  }

  findAll() {
    return `This action returns all boxCash`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boxCash`;
  }

  update(id: number, updateBoxCashDto: UpdateBoxCashDto) {
    return `This action updates a #${id} boxCash`;
  }

  remove(id: number) {
    return `This action removes a #${id} boxCash`;
  }
}
