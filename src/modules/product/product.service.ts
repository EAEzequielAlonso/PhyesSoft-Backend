import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repositor';
import { Product } from './entities/product.entity';
import { searchDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(
        commerceId: string, 
        pageNumber:number,
        limitNumber: number,
        search: searchDto,
        sortField: string,
        sortOrder: string): Promise<[Product[], number]> {
        return this.productRepository.getProducts(commerceId, pageNumber,
          limitNumber,
          search,
          sortField,
          sortOrder);
  }
 
  async getProductById(id: string): Promise<Product> {
    const user = await this.productRepository.getProductById(id);
    if (!user) throw new NotFoundException('Producto no encontrado');
    return user;
  }

  async getProductBySubcategory(subcategoryId: string): Promise<Product[]> {
    return await this.productRepository.getProductBySubcategory(subcategoryId);
  }

  async getProductByModel(modelId: string): Promise<Product[]> {
    return await this.productRepository.getProductByModel(modelId);
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    const productFind = await this.productRepository.createProduct(product);
    if (!productFind)
      throw new InternalServerErrorException(
        'Error al intentar crear el Producto',
      );
    return productFind;
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<string> {
    const productUpdate = await this.productRepository.updateProduct(
      id,
      product,
    );
    if (productUpdate.affected === 0)
      throw new NotFoundException('Producto a actualizar no encontrado');
    return id;
  }

  async deleteProduct(id: string): Promise<string> {
    const productDelete = await this.productRepository.deleteProduct(id);
    if (productDelete.affected === 0)
      throw new NotFoundException('Producto a eliminar no encontrado');
    return id;
  }

  async unsubscribeProduct(id: string): Promise<string> {
    const productUpdate = await this.productRepository.unsubscribeProduct(id);
    if (productUpdate.affected === 0)
      throw new NotFoundException('Producto a dar de baja no encontrado');
    return id;
  }
}
