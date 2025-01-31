import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    const requiresAgencyCheck = this.reflector.get<boolean>(
      'checkAgency',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    if (!user || !user.roles) return false;

    // Compile all permissions of the user
    const userPermissions = new Set(
      user.roles.flatMap((role) => role.permissions.map((perm) => perm.name)),
    );

    // Role-based check
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.has(perm),
    );
    if (!hasPermission) return false;

    // ABAC check: Ensure user belongs to the right agency
    if (requiresAgencyCheck) {
      const agencyIdFromRequest =
        request.body.agencyId || request.params.agencyId;
      if (!agencyIdFromRequest || user.agency.id !== agencyIdFromRequest) {
        return false; // User does not belong to this agency
      }
    }

    return true;
  }
}
