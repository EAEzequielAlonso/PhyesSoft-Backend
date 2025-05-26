import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CashMovementRepository } from './cash-movement.repository';
import { CashMovement } from './entities/cash-movement.entity';
import { DailyCashRepository } from '../daily-cash/daily-cash.repository';

@Injectable()
export class CashMovementService {
  private readonly completeMessage = 'el movimiento de caja';

  constructor(
    private readonly repository: CashMovementRepository,
    private readonly dailyCashrepository: DailyCashRepository,
  ) {}

  async findAll(
    dailyCashId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[CashMovement[], number]> {
    try {
      const response = await this.repository.findAll(
        dailyCashId,
        pageNumber,
        limitNumber,
        search,
      );
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<CashMovement> {
    try {
      const res = await this.repository.findOne(id);
      if (!res)
        throw new NotFoundException(`No se encontro ${this.completeMessage}`);
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(body: Partial<CashMovement>): Promise<CashMovement> {
    try {
      const res = await this.repository.create(body);
      if (!res)
        throw new InternalServerErrorException(
          `No se pudo crear ${this.completeMessage}`,
        );

      // 1. Leer el dailyCash actual
      const dailyCash = await this.dailyCashrepository.findOne(res.dailyCashId);
      if (!dailyCash)
        throw new InternalServerErrorException(`No se encontró la caja diaria`);

      // 2. Actualizar sumando los valores nuevos
      await this.dailyCashrepository.update(res.dailyCashId, {
        movements: (+dailyCash.movements || 0) + (+body.amount || 0),
        movementCount: (+dailyCash.movementCount || 0) + 1,
      });
      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, body: Partial<CashMovement>) {
    try {
      // 1. Leer el movimiento de Caja antes de ser modificado
      const cashMov = await this.repository.findOne(id);
      if (!cashMov)
        throw new InternalServerErrorException(
          `No se pudo encontrar ${this.completeMessage}`,
        );

      const res = await this.repository.update(id, body);
      if (res.affected === 0)
        throw new NotFoundException(
          `No se pudo encontrar ${this.completeMessage}`,
        );

      if (+cashMov.amount != +body.amount) {
        // 1. Leer el dailyCash actual
        const dailyCash = await this.dailyCashrepository.findOne(
          body.dailyCashId,
        );
        if (!dailyCash)
          throw new InternalServerErrorException(
            `No se encontró la caja diaria`,
          );

        // 2. Actualizar sumando los valores nuevos
        await this.dailyCashrepository.update(body.dailyCashId, {
          movements:
            (+dailyCash.movements || 0) + (+body.amount - +cashMov.amount || 0),
        });
      }

      return res;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      // 1. Leer el movimiento de Caja antes de ser eliminado
      const cashMov = await this.repository.findOne(id);
      if (!cashMov)
        throw new InternalServerErrorException(
          `No se pudo encontrar ${this.completeMessage}`,
        );

      const res = await this.repository.remove(id);
      if (res.affected === 0)
        throw new NotFoundException(
          `No se pudo encontrar ${this.completeMessage}`,
        );

      // 1. Leer el dailyCash actual
      const dailyCash = await this.dailyCashrepository.findOne(
        cashMov.dailyCashId,
      );
      if (!dailyCash)
        throw new InternalServerErrorException(`No se encontró la caja diaria`);

      // 2. Actualizar restando el valor eliminado
      await this.dailyCashrepository.update(cashMov.dailyCashId, {
        movements: (+dailyCash.movements || 0) - (+cashMov.amount || 0),
        movementCount: +dailyCash.movementCount - 1,
      });

      return res;
    } catch (error) {
      throw new ConflictException(`Error al eliminar ${this.completeMessage}`);
    }
  }
}
