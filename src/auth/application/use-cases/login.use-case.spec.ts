import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'; // Importante para mockearlo
import { LoginUseCase } from './login.use-case';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { User } from '../../domain/entities/user.entity';

jest.mock('bcrypt');

jest.mock('bcrypt');

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  let authRepository: jest.Mocked<IAuthRepository>;
  let jwtService: jest.Mocked<JwtService>;

  const mockAuthRepository = {
    findByUsernameOrEmail: jest.fn(),
    updateRefreshToken: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_SECRET') return 'test_at_secret';
      if (key === 'JWT_REFRESH_SECRET') return 'test_rt_secret';
      return null;
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        { provide: IAuthRepository, useValue: mockAuthRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    authRepository = module.get(IAuthRepository);
    jwtService = module.get(JwtService);
  });

  describe('execute', () => {
    it('debería retornar tokens si las credenciales son válidas', async () => {
      const mockUser = new User(
        'user-123',
        'jdoe',
        'jdoe@example.com',
        'John',
        'Doe',
        '/avatar.png',
        'hashed_pass',
        null,
      );

      authRepository.findByUsernameOrEmail.mockResolvedValue(mockUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new_hashed_rt');

      jwtService.signAsync
        .mockResolvedValueOnce('access_token_xyz')
        .mockResolvedValueOnce('refresh_token_xyz');

      const result = await useCase.execute({
        identifier: 'jdoe',
        password: 'password123',
      });

      expect(authRepository.findByUsernameOrEmail).toHaveBeenCalledWith('jdoe');
      expect(result).toEqual({
        token: 'access_token_xyz',
        refreshToken: 'refresh_token_xyz',
        expirationToken: 3600,
        expirationRefreshToken: 604800,
      });

      expect(authRepository.updateRefreshToken).toHaveBeenCalledWith(
        'user-123',
        'new_hashed_rt',
      );
    });

    it('debería lanzar UnauthorizedException si el usuario no existe', async () => {
      authRepository.findByUsernameOrEmail.mockResolvedValue(null);

      await expect(
        useCase.execute({ identifier: 'ghost', password: '123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
      const mockUser = new User(
        '1',
        'u',
        'e',
        'n',
        's',
        'avatar',
        'pass_hash',
        null,
      );
      authRepository.findByUsernameOrEmail.mockResolvedValue(mockUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        useCase.execute({ identifier: 'u', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
