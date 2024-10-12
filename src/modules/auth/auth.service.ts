import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole } from '../user/entities/role.entity';
import { Role } from '../user/roles/roles.enum';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Si tiene email, Compruebo que el email de usuario no este ya creado, sino devuelve un error   
    let userDB: User = await this.userRepository.getUserByEmail(user.email);
    if (userDB) throw new BadRequestException(`Yo existe un usuario registrado con este email, Prueba con "Olvide mi contraseña"`);

    const passwordHash = await bcrypt.hash(user.password, 10);

    // quito passwordConfrim de user y lo guardo en createUser
    const { passwordConfirm, ...createUser } = user;

    // busco el role asignado, si no existe devuelvo error
    //const userRole: UserRole = await this.userRepository.getRolesUsersByRole(Role.Admin);

    // creo el usuario en la DB pisando el dato del password con la clave hasheada 
    // y agregando la relacion role
    const userSave = await this.userRepository.createUser({
      ...createUser,
      //roleId: userRole.id,
      password: passwordHash,
    });

    //envio email de bienvenida
    // if (userSave.email) {
    //   this.emailService.WelcomeEmail(userSave, passwordConfirm, false);
    // }

    // quito el password y el role del userSave y lo guardo en sendUser para retornarlo
    
    const { password, ...sendUser } = userSave;
    return sendUser;
  }

  async signin(userLogin: LoginUserDto): Promise<Omit<User, 'password'> & { token: string }> {
    // comprueba que el usuario exista, sino devuelve un error
    const userDB = await this.userRepository.getUserByEmail(
      userLogin.email,
    );
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
      id: userDB.id,
      email: userDB.email,
      dni: userDB.dni,
      //roles: userDB.role.role,
    };

    // creo el token, quito el password de userDB y lo guardo en sendUser y retorno el user con el token
    const token = this.jwtService.sign(userPayload);
    const { password, ...sendUser } = userDB;
    return { ...sendUser, token: token };
  }
}
