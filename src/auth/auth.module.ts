import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { AuthService } from './services/auth.service';
import { User } from '../users/entities/user.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tenant]), FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthGuard],
  exports: [FirebaseAuthGuard],
})
export class AuthModule {}
