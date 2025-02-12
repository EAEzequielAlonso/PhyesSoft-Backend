import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Sale } from './entities/sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleProductsService } from '../saleProducts/saleProducts.service';
import { SaleProducts } from '../saleProducts/entities/saleProducts.entity';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly saleProductsService: SaleProductsService,
  ) {}

  async getSales(startDate?: Date, endDate?: Date): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleRepository.getSales(startDate, endDate);
      } else {
        return await this.saleRepository.getSales(startDate);
      }
    }
    return await this.saleRepository.getSales();
  }

  async getSalesByBranch(
    branchId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Sale[]> {
    if (startDate) {
      if (endDate) {
        return await this.saleRepository.getSalesByBranch(
          branchId,
          startDate,
          endDate,
        );
      } else {
        return await this.saleRepository.getSalesByBranch(branchId, startDate);
      }
    }
    return await this.saleRepository.getSalesByBranch(branchId);
  }

  //   async getSalesByCommerce (commerceId:string, startDate?: Date, endDate?: Date): Promise<Sale[]> {
  //       if (startDate) {
  //           if (endDate) {
  //               return await this.saleRepository.getSalesByCommerce(commerceId, startDate, endDate);
  //           } else {
  //               return await this.saleRepository.getSalesByCommerce(commerceId, startDate);
  //           }
  //       }
  //       return await this.saleRepository.getSalesByCommerce(commerceId);
  //   }

  async getSaleById(id: string): Promise<Sale> {
    const sale = await this.saleRepository.getSaleById(id);
    if (!sale) throw new NotFoundException('No se encontro la venta buscada');
    return sale;
  }

  async createSale(
    sale: Partial<Sale>,
    products: Partial<SaleProducts>[],
  ): Promise<Sale> {
    const saleCreated = await this.saleRepository.createSale(sale);
    if (!saleCreated)
      throw new InternalServerErrorException('No se pudo crear la venta');
    products.forEach(async (product) => {
      await this.saleProductsService.createSaleProducts({
        saleId: saleCreated.id,
        ...product,
      });
    });
    return saleCreated;
  }
}
