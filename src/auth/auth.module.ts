import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { FirebaseService } from './services/firebase.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService, FirebaseAuthGuard],
})
export class AuthModule {}
