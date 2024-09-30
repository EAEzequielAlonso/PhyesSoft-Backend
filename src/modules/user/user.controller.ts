import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './roles/roles.enum';
import { UserRole } from './entities/role.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers (): Promise<User[]> {
    return await this.userService.getUsers()
  }

  @Get("email/:email")
  async getUserByEmail(@Param("email") email: string): Promise<User> {
    return await this.userService.getUserByEmail(email)

  }

  @Get("role/:role")
  async getRolesUsersByRole(@Param("role") role: Role): Promise<UserRole> {
    return await this.userService.getRolesUsersByRole(role);
  }

  @Get(":id")
  async getUsersById (@Param("id", ParseUUIDPipe) id: string): Promise<User> {
    return await this.userService.getUserById(id)
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Put("unsubscribe/:id")
  async unsubscribeUser(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.userService.unsubscribeUser(id);
  }

  @Put(":id")
  async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user: UpdateUserDto): Promise<string> {
    return await this.userService.updateUser(id, user);
  }

  @Delete(":id")
  async deleteUser(@Param("id", ParseUUIDPipe) id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }

}
