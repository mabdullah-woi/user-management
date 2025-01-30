import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Param decorator to extract the user or a specific user property.
// Note that request.user is set by extracting payload from AT or RT.
export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) {
      return request.user;
    }

    return request.user.data;
  },
);
