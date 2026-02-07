import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../../domain/repositories/auth.repository';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(userId: string): Promise<void> {
    await this.authRepository.updateRefreshToken(userId, null);
  }
}
