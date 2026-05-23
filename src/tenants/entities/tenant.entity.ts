import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
    length: 100,
  })
  slug: string;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
