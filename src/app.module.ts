import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST,

      port: Number(process.env.DB_PORT),

      username: process.env.DB_USERNAME,

      password: process.env.DB_PASSWORD,

      database: process.env.DB_DATABASE,

      ssl: process.env.NODE_ENV === 'production'
      ? {
        rejectUnauthorized: false,
      }
      : false,

      autoLoadEntities: true,

      synchronize: false,

      logging: true,
    }),
    TenantsModule,
    UsersModule,
    AuthModule,
    FirebaseModule,
  ],
})
export class AppModule {}
