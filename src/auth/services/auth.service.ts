import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({
      where: { email: dto.email, tenantId: dto.tenantId },
    });

    if (exists) {
      return { message: 'User already exists' };
    }

    const user = this.userRepo.create({
      email: dto.email,
      username: dto.username,
      tenantId: dto.tenantId,
    });

    return this.userRepo.save(user);
  }
}
