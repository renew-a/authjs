import { Injectable, BadRequestException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { auth } from 'firebase-admin';

import { User } from '../../users/entities/user.entity';

import { Tenant } from '../../tenants/entities/tenant.entity';

import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
  ) {}

  async register(
    dto: RegisterDto,

    firebaseUser: auth.DecodedIdToken,
  ) {
    const firebaseTenantId = firebaseUser.firebase?.tenant;

    const tenant = await this.tenantRepo.findOne({
      where: {
        firebaseTenantId,
      },
    });

    if (!tenant) {
      throw new BadRequestException('Tenant not found');
    }

    const exists = await this.userRepo.findOne({
      where: {
        firebaseUid: firebaseUser.uid,
      },
    });

    if (exists) {
      return exists;
    }

    const user = this.userRepo.create({
      email: firebaseUser.email,

      firebaseUid: firebaseUser.uid,

      firebaseTenantId,

      tenantId: tenant.id,

      username: dto.username,
    });

    return this.userRepo.save(user);
  }
}
