import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
}
