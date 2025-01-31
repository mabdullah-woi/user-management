import { User } from 'src/user/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'agency' })
export class Agency {
  @Column({ name: 'id', type: 'uuid', primary: true })
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.agency)
  users: User[];
}
