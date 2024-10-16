import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
@Injectable()
export class BranchRepository {

    constructor (
          @InjectRepository(Branch) private branchRepository: Repository<Branch>) {}

    async getBranchs (): Promise<Branch[]> {
        return await this.branchRepository.find()
    }

    async getBranchById (id: string): Promise<Branch> {
      return await this.branchRepository.findOne({where: {id}})
    }

    async getBranchByCommerceId (commerceId: string): Promise<Branch[]> {
        return await this.branchRepository.find({where: {commerceId}})
    }

    async getBranchByUserId (userId: string): Promise<Branch[]> {
        return await this.branchRepository.find({where: {commerce: {userPropId: userId}}})
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
      return await this.branchRepository.update(id, {endDate:new Date()});
    }

}
