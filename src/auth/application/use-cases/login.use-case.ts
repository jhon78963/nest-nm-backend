import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import type { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthManager } from '../services/auth-manager';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private readonly authManager: AuthManager,
  ) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.authRepository.findByUsernameOrEmail(
      dto.identifier,
    );
    if (!user) throw new ForbiddenException('Access denied');

    const isMatch = await this.authManager.verifyCredentials(
      dto.password,
      user.password,
    );
    if (!isMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.authManager.getTokens(
      user.id,
      user.email,
      user.username,
    );
    await this.authManager.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }
}
