import { Role } from 'src/role/role.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'permission' })
export class Permission {
  @Column({ name: 'id', type: 'uuid', primary: true })
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
