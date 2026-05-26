import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsUUID()
  tenantId: string;
}
