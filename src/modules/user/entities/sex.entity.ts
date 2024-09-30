import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'sexes',
})
export class Sex {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  sex: string;

  /* RELACION UNO-A-MUCHOS CON pets */
  @OneToMany(() => User, (user) => user.sex)
  users: User[];
}