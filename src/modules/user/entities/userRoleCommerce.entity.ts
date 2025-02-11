import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Commerce } from 'src/modules/commerce/entities/commerce.entity';
import { UserRole } from './role.entity';

@Entity({
  name: 'UserRoleCommerce',
})
export class UserRoleCommerce {
  
  @ManyToOne(() => UserRole, (role) => role.userRoleCommerces)
  @JoinColumn({name: "roleId"})
  role: UserRole;
  @PrimaryColumn('uuid')
  roleId: string;

  @ManyToOne(() =>Commerce, (commerce) => commerce.userRoleCommerces)
  @JoinColumn({name: "commerceId"})
  commerce: Commerce;
  @PrimaryColumn('uuid')
  commerceId: string;

  @ManyToOne(() => User, (user) => user.userRoleCommerces)
  @JoinColumn({name: "userId"})
  user: User;
  @PrimaryColumn('uuid')
  userId: string;
}
