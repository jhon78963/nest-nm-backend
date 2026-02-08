import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './interfaces/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserEntity } from './infrastructure/models/user.model';

// Implementaciones
import { AuthDataSource } from './infrastructure/datasources/typeorm/auth.datasource';
import { AuthRepository } from './infrastructure/repositories/user.repository';
import { AuthSeeder } from './infrastructure/seeds/auth.seeder';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { AuthManager } from './application/services/auth-manager';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';
import { RefreshTokenStrategy } from './infrastructure/strategies/refresh-token.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    GetProfileUseCase,
    LoginUseCase,
    RegisterUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    AuthSeeder,
    AuthManager,
    JwtStrategy,
    RefreshTokenStrategy,
    {
      provide: 'IAuthDataSource',
      useClass: AuthDataSource,
    },
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
  ],
  exports: [
    GetProfileUseCase,
    LoginUseCase,
    RegisterUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    AuthManager,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
