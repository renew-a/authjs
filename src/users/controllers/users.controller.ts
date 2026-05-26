import { Controller, Get, UseGuards } from '@nestjs/common';

import { FirebaseAuthGuard } from '../../auth/guards/firebase-auth.guard';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';

import { FirebaseUser } from '../../auth/interfaces/firebase-user.interface';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  getMe(
    @CurrentUser()
    user: FirebaseUser,
  ) {
    return {
      uid: user.uid,

      email: user.email,

      tenant: user.firebase?.tenant,
    };
  }
}
