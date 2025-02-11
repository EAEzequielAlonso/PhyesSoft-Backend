import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { Role } from './roles/roles.enum';
import { UserRole } from './entities/role.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async getClients(): Promise<User[]> {
    return await this.userRepository.getClients();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async getRolesUsersByRole(role: Role): Promise<UserRole> {
    const userRole = await this.userRepository.getRolesUsersByRole(role);
    if (!userRole) throw new NotFoundException('Rol de Usuario no encontrado');
    return userRole;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const userFind = await this.userRepository.createUser(user);
    if (!userFind)
      throw new InternalServerErrorException(
        'Error al intentar crear el Usuario',
      );
    return userFind;
  }

  async updateUser(id: string, user: Partial<User>): Promise<string> {
    const userUpdate = await this.userRepository.updateUser(id, user);
    if (userUpdate.affected === 0)
      throw new NotFoundException('Usuario a actualizar no encontrado');
    return id;
  }

  async deleteUser(id: string): Promise<string> {
    const userDelete = await this.userRepository.deleteUser(id);
    if (userDelete.affected === 0)
      throw new NotFoundException('Usuario a eliminar no encontrado');
    return id;
  }

  async unsubscribeUser(id: string): Promise<string> {
    const userUpdate = await this.userRepository.unsubscribeUser(id);
    if (userUpdate.affected === 0)
      throw new NotFoundException('Usuario a dar de baja no encontrado');
    return id;
  }
}
