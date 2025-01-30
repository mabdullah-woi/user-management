import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type Payload = {
  sub: string;
  email: string;
  jti: string;
  iat: number;
  exp: number;
  refreshToken: string;
};

// Check if signature of received RT is correct.
// Return true if check passes, otherwise throw an error.
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Will check for expiry against the database manually.
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true, // Do not destroy the token after validating signature, pass to the callback instead.
    });
  }

  // req.user = { ...payload, refreshToken }
  validate(req: Request, payload: Payload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
