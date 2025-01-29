import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'refresh_token' })
export class RefreshToken {
  @Column({ name: 'id', primary: true, type: 'uuid' })
  id: string;

  @Column({ name: 'expiry', type: 'timestamptz' })
  expiry: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
