import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/entities/role.entity';
import { Role } from '../user/roles/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    
    let userDB: User = await this.userRepository.getUserByEmail(user.email);
    if (userDB)
      throw new UnauthorizedException(
        `Ya existe un usuario registrado con este email, Prueba con "Olvide mi contraseña"`,
      );// compruebo que no exista el email

    const { passwordConfirm, ...createUser } = user; // saco el confirmPassword que viene en el DTO

    const userRole: UserRole = await this.userRepository.getRolesUsersByRole(
      Role.CommerceAdmin,
    );
    const HashPassword = await bcrypt.hash(user.password, 10);
    const userSave = await this.userRepository.createUser({
      ...createUser,
      roleId: userRole.id,
      password: HashPassword,
    });

    //envio email de bienvenida
    // if (userSave.email) {
    //   this.emailService.WelcomeEmail(userSave, passwordConfirm, false);
    // }

    const { password, ...sendUser } = userSave;
    return sendUser;
  }

  async signin(userLogin: LoginUserDto): Promise<Object> {
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
      ...userDB,
    };
    const token = this.jwtService.sign(userPayload);
    return { token: token };
  }
}
