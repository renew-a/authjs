import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { Request } from 'express';

import * as admin from 'firebase-admin';

import { auth } from 'firebase-admin';

interface RequestWithUser extends Request {
  user?: auth.DecodedIdToken;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private firebase: admin.app.App,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token missing');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = await this.firebase.auth().verifyIdToken(token);

      request.user = decoded;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
