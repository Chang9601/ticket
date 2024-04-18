import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithUser } from '@app/common';

export const AuthUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    return request.user;
  },
);
