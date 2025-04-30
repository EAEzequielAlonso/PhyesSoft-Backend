import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../user/roles/roles.enum';
import { LoginUserDto } from './dto/loginUser.dto';
import * as bcrypt from "bcrypt"
import { UserRole } from '../user/entities/role.entity';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';
import { RegisterUserDto } from './dto/registerUser.dto';
import { CommerceRepository } from '../commerce/commerce.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commerceRepository: CommerceRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: RegisterUserDto): Promise<{message:string}> {
    
    try {
    const userDB: User = await this.userRepository.getUserByEmail(user.email);
    if (userDB)
      throw new UnauthorizedException(
        `Ya existe un usuario registrado con este email, Prueba con "Olvide mi contraseña"`,
      );// compruebo que no exista el email

    const userRole: UserRole = await this.userRepository.getRolesUsersByRole(
      Role.CommerceAdmin,
    );
    const HashPassword = await bcrypt.hash(user.password, 10);

    const userSave = await this.userRepository.createUser({
      email: user.email,
      roleId: userRole.id,
      password: HashPassword,
    });

    await this.commerceRepository.createCommerce({nameCompany: user.commerce, nameFantacy: user.commerce, userId: userSave.id});

  //   //envio email de bienvenida
    // if (userSave.email) {
    //   this.emailService.WelcomeEmail(userSave, passwordConfirm, false);
    // }

    return {message: "Usuario Registrado Con Exito"};
  } catch (error) {

  }
    
  }

  async signin(userLogin: LoginUserDto, res: Response): Promise<Object> {
    // comprueba que el usuario exista, sino devuelve un error
    const userDB = await this.userRepository.getUserByEmail(userLogin.email);
    if (!userDB) {
      throw new BadRequestException('Usuario o Clave incorrectos');
    }
    // comprueba que la clave sea correcta, sino devuelve un error
    const isPasswordValid = await bcrypt.compare(
      userLogin.password,
      userDB.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Usuario o Clave incorrectos');
    }

    //creo el Payload a guardar en el token, con id, email, y los roles asignados al usuario
    const userPayload = {
      ...userDB
    };
    const token = this.jwtService.sign(userPayload);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    });
    return res.json({ token });
  }

  async signOut(res: Response): Promise<Object> {
    const isProd = process.env.NODE_ENV === 'production';
  
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    });
  
    return res.json({ message: 'Sesión cerrada correctamente' });
  }

  async resetPassword(email:string, password:string): Promise<Object> {
    
    const HashPassword = await bcrypt.hash(password, 10);
    
    const resp = await this.userRepository.resetPassword(email, HashPassword)
    
    if ( resp.affected === 0 ) throw new NotFoundException("Email no encontrado")
      
    return {message: "Contraseña Actualizada"};
  }

}