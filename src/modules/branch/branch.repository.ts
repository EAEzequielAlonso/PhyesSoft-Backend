import { Injectable } from '@nestjs/common';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
@Injectable()
export class BranchRepository {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {}

  async getBranchs(
    commerceId: string,
    pageNumber: number,
    limitNumber: number,
    search: string,
  ): Promise<[Branch[], number]> {
    return this.branchRepository.findAndCount({
      where: {
        name: ILike(`%${search}%`),
        commerceId,
      },
      relations: { fiscalData: true, boxesCash: true },
      order: { createdAt: 'DESC' }, // Asegúrate de que la entidad tenga un campo createdAt
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
  }

  async findCommerce(commerceId: string): Promise<Branch[]> {
    return await this.branchRepository.find({ where: { commerceId } });
  }

  async getBranchById(id: string): Promise<Branch> {
    return await this.branchRepository.findOne({ where: { id } });
  }

  async exist(branchId: string, userId: string): Promise<boolean> {
    return await this.branchRepository.exists({ where: { id: branchId } });
  }

  async getBranchByCommerceId(commerceId: string): Promise<Branch[]> {
    return await this.branchRepository.find({ where: { commerceId } });
  }

  async getBranchByUserId(userId: string): Promise<Branch[]> {
    return await this.branchRepository.find({
      where: { commerce: { userId } },
    });
  }

  async createBranch(user: Partial<Branch>): Promise<Branch> {
    return await this.branchRepository.save(user);
  }

  async updateBranch(id: string, user: Partial<Branch>): Promise<UpdateResult> {
    return await this.branchRepository.update(id, user);
  }

  async deleteBranch(id: string): Promise<DeleteResult> {
    return await this.branchRepository.delete(id);
  }

  async unsubscribeBranch(id: string): Promise<UpdateResult> {
    return await this.branchRepository.update(id, { endDate: new Date() });
  }
}
