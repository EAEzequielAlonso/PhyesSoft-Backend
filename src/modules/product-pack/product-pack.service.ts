import { Injectable } from '@nestjs/common';
import { CreateProductPackDto } from './dto/create-product-pack.dto';
import { UpdateProductPackDto } from './dto/update-product-pack.dto';

@Injectable()
export class ProductPackService {
  create(createProductPackDto: CreateProductPackDto) {
    return 'This action adds a new productPack';
  }

  findAll() {
    return `This action returns all productPack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productPack`;
  }

  update(id: number, updateProductPackDto: UpdateProductPackDto) {
    return `This action updates a #${id} productPack`;
  }

  remove(id: number) {
    return `This action removes a #${id} productPack`;
  }
}
