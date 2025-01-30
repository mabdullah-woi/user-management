import { RefreshToken } from 'src/token/refresh-token.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { USER_TYPE } from './enums/user-type.enum';

@Entity({ name: 'user' })
export class User {
  @Column({ name: 'id', type: 'uuid', primary: true })
  id: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: true, select: false })
  password: string;

  @Column({ name: 'type', type: 'varchar' })
  type: USER_TYPE;

  @Column({ name: 'auth_source', type: 'simple-array' })
  authSource: string[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  updatedAt?: Date;
}
