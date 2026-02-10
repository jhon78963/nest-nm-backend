import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import type { IAuthRepository } from '../../domain/repositories/auth.repository';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { AuthManager } from '../services/auth-manager';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private readonly authManager: AuthManager,
  ) {}

  async execute(
    userId: string,
    refreshToken: string,
  ): Promise<AuthResponseDto> {
    const user = await this.authRepository.findById(userId);
    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const isMatch = await this.authManager.verifyRefreshToken(
      refreshToken,
      user.hashedRt,
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
