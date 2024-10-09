import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SaleProductsRepository } from './saleProducts.repository';
import { SaleProducts } from './entities/saleProducts.entity';

@Injectable()
export class SaleProductsService {
  
  constructor (private readonly saleProductsRepository: SaleProductsRepository) {}

  async getSaleProducts (): Promise<SaleProducts[]> {
      return await this.saleProductsRepository.getSaleProducts();
  }

  async getSaleProductsBySale (saleId:string): Promise<SaleProducts[]> {
      return await this.saleProductsRepository.getSaleProductsBySale(saleId)
  }

  async createSaleProducts (saleProducts:Partial<SaleProducts>): Promise<SaleProducts> {
    const saleProductCreate: SaleProducts = await this.saleProductsRepository.createSaleProducts(saleProducts);
    if (!saleProductCreate) throw new InternalServerErrorException ("No se pudo agregar el producto a la venta")
    return saleProductCreate;
  }

}
