import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "./entities/role.entity";
import { Repository } from "typeorm";
import preloadUserRole from "../../preloadFiles/roles.json" 

@Injectable()
export class RoleService {

    constructor (@InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>) {}

    async preloadRole () {
        let count:number  = 0
        preloadUserRole.map (async (role) => {
            const roleFind = await this.userRoleRepository.findOne({where: {role: role.role}})
            if (!roleFind) {
                await this.userRoleRepository.save(role);
                count++;
            }
        })
        console.log(`Se agregaron ${count} roles de usuario`)
    }
}