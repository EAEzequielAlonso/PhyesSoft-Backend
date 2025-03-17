import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { searchDto } from './dto/create-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getProducts(commerceId:string, pageNumber:number,
         limitNumber: number,
         search: searchDto,
         sortField: string,
         sortOrder: string): Promise<[Product[], number]> {
         const query = this.productRepository.createQueryBuilder("product")
           .leftJoinAndSelect("product.sizeType", "sizeType")
           .leftJoinAndSelect("product.category", "category")
           .leftJoinAndSelect("product.subcategory", "subcategory")
           .leftJoinAndSelect("product.brand", "brand")
           .leftJoinAndSelect("product.model", "model")
           .where("product.name LIKE :name", { name: `%${search.name}%` })
           .andWhere("product.commerceId = :commerceId", { commerceId })
          
         if (search.categoryId !== '') query.andWhere("product.categoryId = :catId", { catId: search.categoryId });
         if (search.brandId !== '') query.andWhere("product.brandId = :braId", { braId: search.brandId });
         if (search.sizeTypeId !== '') query.andWhere("product.sizeTypeId = :stId", { stId: search.sizeTypeId });
         // Agregar orden dinámico
         if (sortField === "name") {
           query.orderBy("product.name", sortOrder.toUpperCase() as "ASC" | "DESC");
         } else {
           query.orderBy(`${sortField}.name`, sortOrder.toUpperCase() as "ASC" | "DESC");
         }
         
         // Aplicar paginación
         query.skip((pageNumber - 1) * limitNumber).take(limitNumber);
         const result = await query.getManyAndCount();
         return await query.getManyAndCount();
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
