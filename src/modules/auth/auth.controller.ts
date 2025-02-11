import { Controller, Post, Body, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Autentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Realiza el Login de usuarios' })
  @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
  async signin(@Body() userLogin: LoginUserDto): Promise<Object> {
    return await this.authService.signin(userLogin);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registra usuarios nuevos' })
  //@Redirect() // ejecuto todo el signup pero en el return pongo "return http//Localhost:3000/auth/signin"
  @ApiBody({
    description: 'Ingrese todos los datos requeridos',
    type: CreateUserDto,
  })
  async signup(
    @Body() user: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'role'>> {
    return await this.authService.signup(user);
  }
}
