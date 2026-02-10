import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Gender } from '../../domain/entities/gender.entity';
import type { IGenderRepository } from '../../domain/repositories/gender.repository';

@Injectable()
export class GetGenderUseCase {
  constructor(
    @Inject('IGenderRepository') private genderRepository: IGenderRepository,
  ) {}

  async execute(id: string): Promise<Gender> {
    const existingGender = await this.genderRepository.findById(id);
    if (!existingGender) {
      throw new NotFoundException(`Gender with id ${id} not found`);
    }

    return existingGender;
  }
}
