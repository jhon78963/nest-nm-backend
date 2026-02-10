import { Inject, Injectable } from '@nestjs/common';
import type { IGenderRepository } from '../../domain/repositories/gender.repository';

@Injectable()
export class GetGendersUseCase {
  constructor(
    @Inject('IGenderRepository') private genderRepository: IGenderRepository,
  ) {}

  async execute() {
    return this.genderRepository.findAll();
  }
}
