import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async getBrands(): Promise<Brand[]> {
    return this.brandRepository.getBrands();
  }

  async getBrandById(id: string): Promise<Brand> {
    const brand: Brand = await this.brandRepository.getBrandById(id);
    if (!brand) throw new NotFoundException('Marca no encontrada');
    return brand;
  }

  async createBrand(brand: Partial<Brand>): Promise<Brand> {
    const brandCreate: Brand = await this.brandRepository.createBrand(brand);
    if (!brandCreate)
      throw new InternalServerErrorException('No se pudo crear la marca');
    return brandCreate;
  }

  async updateBrand(id: string, brand: Partial<Brand>): Promise<Brand> {
    const brandUpdate = await this.brandRepository.updateBrand(id, brand);
    if (brandUpdate.affected === 0)
      throw new NotFoundException('No se encontro la marca a actualizar');
    return await this.brandRepository.getBrandById(id);
  }

  async deleteBrand(id: string): Promise<Brand> {
    const brand = await this.brandRepository.getBrandById(id);
    if (!brand)
      throw new NotFoundException('No se encontro la marca a eliminar');
    await this.brandRepository.deleteBrand(id);
    return brand;
  }
}
