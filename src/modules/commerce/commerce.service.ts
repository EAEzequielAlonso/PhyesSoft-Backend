import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommerceRepository } from './commerce.repository';
import { Commerce } from './entities/commerce.entity';

@Injectable()
export class CommerceService {
    
  constructor (private readonly commerceRepository: CommerceRepository) {}

    async getCommerce (): Promise<Commerce> {
      return await this.commerceRepository.getCommerce()
    }

    // async getCommerceByUserId (userId: string): Promise<Commerce[]> {
    //   return await this.commerceRepository.getCommerceByUserId(userId)
    // }

    async getCommerceById (id: string): Promise<Commerce> {
      const commerce = await this.commerceRepository.getCommerceById(id)
      if (!commerce) throw new NotFoundException("Comercio no encontrado")
      return commerce;
    }

    async createCommerce(commerce: Partial<Commerce>): Promise<Commerce> {
      const commerceFind = await this.commerceRepository.createCommerce(commerce);
      if (!commerceFind) throw new InternalServerErrorException("Error al intentar crear el Comercio")
      return commerceFind;
    }

    async updateCommerce(id: string, commerce: Partial<Commerce>): Promise<string> {
      const commerceUpdate = await this.commerceRepository.updateCommerce(id, commerce);
      if (commerceUpdate.affected === 0) throw new NotFoundException ("Comercio a actualizar no encontrado")
      return id;
    }

    async deleteCommerce(id: string): Promise<string> {
      const commerceDelete = await this.commerceRepository.deleteCommerce(id);
      if (commerceDelete.affected === 0) throw new NotFoundException ("Comercio a eliminar no encontrado")
      return id;
    }

    async unsubscribeCommerce(id: string): Promise<string> {
      const commerceUpdate = await this.commerceRepository.unsubscribeCommerce(id);
      if (commerceUpdate.affected === 0) throw new NotFoundException ("Comercio a dar de baja no encontrado")
      return id;
    }
}
