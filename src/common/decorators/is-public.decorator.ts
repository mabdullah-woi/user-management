import { SetMetadata } from '@nestjs/common';

// Sets `isPublic` property for us to later access using the Reflector API.
export const Public = () => SetMetadata('isPublic', true);
