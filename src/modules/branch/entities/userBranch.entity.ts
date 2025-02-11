import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserRole } from 'src/modules/user/entities/role.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Branch } from './branch.entity';


@Entity({
  name: 'UserRoleBranch',
})
export class UserRoleBranch {
  
  @ManyToOne(() => UserRole, (role) => role.userRoleBranches)
  @JoinColumn({name: "roleId"})
  role: UserRole;
  @PrimaryColumn('uuid')
  roleId: string;

  @ManyToOne(() =>Branch, (branch) => branch.userRoleBranches)
  @JoinColumn({name: "branchId"})
  branch: Branch;
  @PrimaryColumn('uuid')
  branchId: string;

  @ManyToOne(() => User, (user) => user.userRoleBranches)
  @JoinColumn({name: "userId"})
  user: User;
  @PrimaryColumn('uuid')
  userId: string;
}
