import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginUser.dto';
import { Response } from 'express';   // servicio que verifica Clerk
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from './dto/registerUser.dto';


@ApiTags('Autentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

   @Post('signin')
   @ApiOperation({ summary: 'Realiza el Login de usuarios' })
   @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
   async signin(@Body() userLogin: LoginUserDto, @Res() res:Response): Promise<Object> {
     return await this.authService.signin(userLogin, res);
   }

   @Post('signup')
   @ApiOperation({ summary: 'Registra usuarios nuevos' })
   @ApiBody({
  //   description: 'Ingrese todos los datos requeridos',
  //   type: CreateUserDto,
   })
   async signup(
     @Body() user: RegisterUserDto,
   ): Promise<{message:string}> {
     return await this.authService.signup(user);
   }

   @Post('signout')
   @HttpCode(HttpStatus.OK)
   async signOut(@Res() res: Response): Promise<Object> {
     return await this.authService.signOut(res);
   }

   @Post('reset-password')
   @ApiOperation({ summary: 'Realiza el reestablecimiento de las claves' })
   @ApiBody({ description: 'Las credenciales', type: LoginUserDto })
   async resetPassword(@Body() userLogin: LoginUserDto): Promise<Object> {
     return await this.authService.resetPassword(userLogin.email, userLogin.password);
   }
}


