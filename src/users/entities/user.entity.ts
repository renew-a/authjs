import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('users')
@Index(['email', 'tenantId'], {
  unique: true,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  firebaseUid: string;

  @Column()
  firebaseTenantId: string;

  @Column()
  tenantId: string;

  @Column()
  username: string;

  @Column({
    default: 'USER',
  })
  role: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn({
    name: 'tenantId',
  })
  tenant: Tenant;

  @CreateDateColumn()
  createdAt: Date;
}
