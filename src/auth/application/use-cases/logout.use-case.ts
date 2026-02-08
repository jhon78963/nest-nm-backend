import { Inject, Injectable } from '@nestjs/common';
import type { IAuthRepository } from '../../domain/repositories/auth.repository';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.authRepository.updateRefreshToken(userId, null);
  }
}
