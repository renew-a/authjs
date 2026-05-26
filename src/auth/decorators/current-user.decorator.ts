import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { auth } from 'firebase-admin';

interface RequestWithUser extends Request {
  user?: auth.DecodedIdToken;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): auth.DecodedIdToken | undefined => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
