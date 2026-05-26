import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';
import { RegisterDto } from '../dtos/register.dto';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(FirebaseAuthGuard)
  async register(
    @Body() dto: RegisterDto,

    @CurrentUser()
    user: any,
  ) {
    return this.authService.register(dto, user);
  }
}
