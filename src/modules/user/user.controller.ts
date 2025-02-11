import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './roles/roles.enum';
import { UserRole } from './entities/role.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/Auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('clients')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getClients(): Promise<User[]> {
    return await this.userService.getClients();
  }

  @Get('email/:email')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.getUserByEmail(email);
  }

  @Get('role/:role')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getRolesUsersByRole(@Param('role') role: Role): Promise<UserRole> {
    return await this.userService.getRolesUsersByRole(role);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUsersById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Put('unsubscribe/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async unsubscribeUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    return await this.userService.unsubscribeUser(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<string> {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }
}
