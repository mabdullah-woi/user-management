import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

// AT guard intercepts the request before the controller logic is executed.
// Then, it passes on the request to a strategy for AT validation.
// If the strategy returns true, guard allows the controller logic to be executed.
@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Check if the metadata contains "isPublic".
  // If so, skip the AT validation.
  // If not, pass the request to parent "canActivate" method for validating AT.
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
