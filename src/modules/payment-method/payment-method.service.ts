import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaymentMethodRepository } from './payment-method.repository';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly repository: PaymentMethodRepository) {}
  
    async findAll(commerceId: string, pageNumber:number,
        limitNumber: number,
        search: string): Promise<[PaymentMethod[], number]> {
      try {  
        const response = await this.repository.findAll(commerceId, pageNumber,
          limitNumber,
          search);
        return response
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async findCemmerce(commerceId:string): Promise<PaymentMethod[]> {
      try {
        const res = await this.repository.findCommerce(commerceId);
        if (!res) throw new NotFoundException("No se encontraron los metodos de pago")
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async findOne(id: string): Promise<PaymentMethod> {
      try {
        const res = await this.repository.findOne(id);
        if (!res) throw new NotFoundException("No se encontro el metodo de pago")
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async create(method: Partial<PaymentMethod>): Promise<PaymentMethod> {
      try {
        const res = await this.repository.create(method);
        if (!res) throw new InternalServerErrorException("No se pudo crear el metodo de pago")
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async update(id: string, method: Partial<PaymentMethod>) {
      try {
        const res = await this.repository.update(id, method);
        if (res.affected === 0) throw new NotFoundException("No se pudo encontrar el metodo de pago")
        return res;
      } catch (error) {
        throw new InternalServerErrorException(error)
      }
    }
  
    async remove(id: string) {
      try {
        const res = await this.repository.remove(id);
        if (res.affected === 0) throw new NotFoundException("No se pudo encontrar el metodo de pago")
        return res;
      } catch (error) {
        throw new ConflictException(
          'Actualmente el metodo de pago esta siendo usado. No se puede eliminar ya que dejaría información incompleta. Puede probar modificando el metodo de pago si lo cree necesario. Error: ',error);
      }
    }
}
