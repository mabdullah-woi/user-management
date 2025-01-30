import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository';
import { TokenService } from './services/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken]), JwtModule],
  providers: [RefreshTokenRepository, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
