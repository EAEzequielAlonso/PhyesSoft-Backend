import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleCommerce } from './userRoleCommerce.entity';
import { UserRoleBranch } from 'src/modules/branch/entities/userBranch.entity';

@Entity({
  name: 'roles',
})
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  role: string;

  @OneToMany (() => UserRoleCommerce, (userRoleCommerce) => userRoleCommerce.role)
  userRoleCommerces: UserRoleCommerce[];

  @OneToMany (() => UserRoleBranch, (userRoleBranch) => userRoleBranch.role)
  userRoleBranches: UserRoleBranch[];
}
