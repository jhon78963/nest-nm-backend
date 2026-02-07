import { ConflictException, Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { RegisterDto } from '../dtos/register.dto';
import { User } from 'src/auth/domain/entities/user.entity';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { AuthManager } from '../services/auth-manager';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly authManager: AuthManager,
  ) {}

  async execute(dto: RegisterDto): Promise<AuthResponseDto> {
    const existsEmail = await this.authRepository.findByEmail(dto.email);
    if (existsEmail) throw new ConflictException('Email already exists');

    const existsUser = await this.authRepository.findByUsername(dto.username);
    if (existsUser) throw new ConflictException('Username already exists');

    const hashedPassword = await this.authManager.getHashedPassword(
      dto.password,
    );

    const newUser = new User(
      '',
      dto.username,
      dto.email,
      dto.name,
      dto.surname,
      hashedPassword,
      'https://i.imgur.com/Hepj9ZS.png',
      '',
    );
    const user = await this.authRepository.create(newUser);

    const tokens = await this.authManager.getTokens(
      user.id,
      user.email,
      user.username,
    );
    await this.authManager.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }
}
