import { Injectable } from '@nestjs/common';
import { CreateProductCodbarDto } from './dto/create-product-codbar.dto';
import { UpdateProductCodbarDto } from './dto/update-product-codbar.dto';

@Injectable()
export class ProductCodbarService {
  create(createProductCodbarDto: CreateProductCodbarDto) {
    return 'This action adds a new productCodbar';
  }

  findAll() {
    return `This action returns all productCodbar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCodbar`;
  }

  update(id: number, updateProductCodbarDto: UpdateProductCodbarDto) {
    return `This action updates a #${id} productCodbar`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCodbar`;
  }
}
