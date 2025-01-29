import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RefreshTokenModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
