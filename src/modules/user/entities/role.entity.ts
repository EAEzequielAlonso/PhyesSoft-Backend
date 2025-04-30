import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleBranch } from 'src/modules/branch/entities/userBranch.entity';
import { User } from './user.entity';

@Entity({
  name: 'roles',
})
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50})
  role: string;

  @OneToMany (() => User, (user) => user.role)
  users: User[];

  @OneToMany (() => UserRoleBranch, (userRoleBranch) => userRoleBranch.role)
  userRoleBranches: UserRoleBranch[]; 
}
 