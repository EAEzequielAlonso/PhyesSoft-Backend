import { Injectable } from '@nestjs/common';
import { Iva } from './entities/iva.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IvaRepository {

  constructor(@InjectRepository(Iva) private repository: Repository<Iva>) {}

  create(body: Partial<Iva>) {
    return this.repository.save(body);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({id});
  }

  update(id: string, body: Partial<Iva>) {
    return this.repository.update(id, body);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
