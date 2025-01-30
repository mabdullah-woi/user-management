import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,

    /* Strategies */
    AtStrategy,
    RtStrategy,
  ],
})
export class UserModule {}
