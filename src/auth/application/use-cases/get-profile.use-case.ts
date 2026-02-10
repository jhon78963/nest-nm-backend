import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IAuthRepository } from '../../domain/repositories/auth.repository';
import { ProfileResponseDto } from '../dtos/profile-response.dto';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
  ) {}

  async execute(userId: string): Promise<ProfileResponseDto> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return {
      username: user.username,
      email: user.email,
      name: user.name,
      surname: user.surname,
      profilePicture: user.profilePicture || null,
      role: 'Admin',
    };
  }
}
