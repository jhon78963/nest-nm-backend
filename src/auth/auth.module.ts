import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './interfaces/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserEntity } from './infrastructure/models/user.model';

// Interfaces (Tokens de Inyección)
import { IAuthDataSource } from './infrastructure/datasource/auth.datasource';
import { IAuthRepository } from './domain/repositories/auth.repository';

// Implementaciones
import { AuthDataSource } from './infrastructure/datasource/typeorm/auth.datasource';
import { AuthRepository } from './infrastructure/repositories/user.repository';
import { AuthSeeder } from './infrastructure/seeds/auth.seeder';
import { RegisterUseCase } from './application/use-cases/register.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    AuthSeeder,
    {
      provide: IAuthDataSource,
      useClass: AuthDataSource,
    },
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
  ],
  exports: [LoginUseCase, RegisterUseCase],
})
export class AuthModule {}
