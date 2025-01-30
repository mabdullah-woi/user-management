import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// RT guard intercepts the request before the controller logic is executed.
// Then, it passes on the request to a strategy for AT validation.
// If the strategy returns true, guard allows the controller logic to be executed.
@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
