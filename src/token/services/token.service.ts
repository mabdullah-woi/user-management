import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { parseTimeToSeconds } from 'src/common/utils/time.util';
import { User } from 'src/user/user.entity';
import { MoreThan } from 'typeorm';
import * as uuid from 'uuid';
import { RefreshTokenRepository } from '../refresh-token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async accessToken(user: User) {
    // Convert time to seconds.
    const expiresIn = parseTimeToSeconds(
      this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN', '15m'),
    );

    // Payload to sign.
    const payload = { sub: user.id, email: user.email };

    // Create the token.
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: expiresIn, // JWT expects expiration in seconds
    });

    return token;
  }

  async refreshToken(user: User) {
    // Convert time to seconds.
    const expiresIn = parseTimeToSeconds(
      this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN', '30m'),
    );

    // Create a record and store in the database.
    const refreshToken = this.refreshTokenRepository.create({
      id: uuid.v4(),
      expiry: new Date(Date.now() + expiresIn * 1000), // Use milliseconds
      user,
      createdAt: new Date(),
    });

    await this.refreshTokenRepository.save(refreshToken);

    // Payload to sign.
    const payload = { sub: user.id, email: user.email };

    // Create the token and set jwtid to the database record id for identification.
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: expiresIn, // JWT expects expiration in seconds
      jwtid: refreshToken.id,
    });

    return token;
  }

  async isRefreshTokenValid(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { id: tokenId, expiry: MoreThan(new Date()) },
    });

    return !!refreshToken;
  }

  async removeRefreshTokenFromDatabase(tokenId: string) {
    await this.refreshTokenRepository.delete({ id: tokenId });
  }
}
