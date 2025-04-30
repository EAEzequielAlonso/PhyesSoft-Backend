import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Role } from './roles/roles.enum';
import { UserRole } from './entities/role.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: { role: true, commerce: true},
    });
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({email});
  }

  async getUserByDni(dni: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { dni },
      relations: { role: true },
    });
  }

  async getRolesUsersByRole(role: Role): Promise<UserRole> {
    return await this.userRoleRepository.findOneBy({ role });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, user: Partial<User>): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async unsubscribeUser(id: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { endDate: new Date() });
  }

  async getUserRoleByName(userRole: string): Promise<UserRole> {
    return await this.userRoleRepository.findOne({ where: { role: userRole } });
  }

  async resetPassword (email:string, password:string): Promise<UpdateResult> {
    return await this.userRepository.update({email}, {password})
  }
}
