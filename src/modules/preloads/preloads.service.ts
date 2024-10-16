// Importacion de los preloads en formato JSON
import preloadSex from "./preloadFiles/sex.json"
import preloadUserRole from "./preloadFiles/roles.json" 
import preloadUser from "./preloadFiles/users.json"


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../user/entities/role.entity';
import { Repository } from 'typeorm';
import { Sex } from '../user/entities/sex.entity';
import { User } from '../user/entities/user.entity';
import * as bcrypt from "bcrypt"

@Injectable()
export class PreloadsService {
  constructor (
      @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
      @InjectRepository(Sex) private sexRepository: Repository<Sex>,
      @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async preloadRole () {
      let count:number  = 0
      for (const role of preloadUserRole) {
          const roleFind = await this.userRoleRepository.findOne({where: {role: role.role}})
          if (!roleFind) {
              await this.userRoleRepository.save(role);
              count++;
          }
      }
      console.log(`Se agregaron ${count} roles de usuario`)
  }

  async preloadSexes (): Promise<void> {
    let count:number  = 0
    for (const dataSex of preloadSex) {
        const sexFind = await this.sexRepository.findOne({where: {sex: dataSex.sex}})
        if (!sexFind) {
            await this.sexRepository.save(dataSex);
            count++;
        }
    }
    console.log(`Se agregaron ${count} sexos`)
  }

  async preloadUsers (): Promise<void> {
    let count:number  = 0
    for (const user of preloadUser) {
          const userFind = await this.userRepository.findOne({ where: {email: user.email}})
          if (!userFind) {
              const roleFind = await this.userRoleRepository.findOneBy({role: user.role});
              const sexFind= await this.sexRepository.findOneBy ({sex: user.sex});
              if (sexFind && roleFind) {
                  const {sex, role, ...userCreate} = user
                  const passwordHash = await bcrypt.hash(user.password, 10);
                  await this.userRepository.save({...userCreate, roleId: roleFind.id, sexId: sexFind.id, password:passwordHash ,birthdate: new Date(user.birthdate), startDate: new Date(user.startDate)});
                  count++;
              }
          } 
      }
      console.log(`Se agregaron ${count} usuarios`)
  }

  async onModuleInit() {
    await this.preloadSexes();
    await this.preloadRole();
    await this.preloadUsers();
  }
}


