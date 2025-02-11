import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }

  async getProductBySubcategory(subcategoryId: string): Promise<Product[]> {
    return await this.productRepository.find({ where: { subcategoryId } });
  }

  async getProductByModel(modelId: string): Promise<Product[]> {
    return await this.productRepository.find({ where: { modelId } });
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async updateProduct(
    id: string,
    product: Partial<Product>,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }

  async unsubscribeProduct(id: string): Promise<UpdateResult> {
    return await this.productRepository.update(id, { endDate: new Date() });
  }
}
