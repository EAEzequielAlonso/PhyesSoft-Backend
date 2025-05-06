
import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DailyCash } from '../entities/daily-cash.entity'; 
  import { Repository } from 'typeorm';
  
  @Injectable()
  export class ValidateOpenCashPipe implements PipeTransform {
    constructor(
      @InjectRepository(DailyCash)
      private readonly dailyCashRepository: Repository<DailyCash>,
    ) {}
  
    async transform(value: any, metadata: ArgumentMetadata) {
      const { boxCashId } = value;
  
      const existing = await this.dailyCashRepository.findOne({
        where: { boxCash: { id: boxCashId }, isOpen: true }, // asumiendo que hay un campo 'status'
      });
  
      if (existing) {
        throw new BadRequestException('Ya hay una unidad abierta para esta caja.');
      }
  
      return value; // si todo está ok, pasa el DTO
    }
  }
  