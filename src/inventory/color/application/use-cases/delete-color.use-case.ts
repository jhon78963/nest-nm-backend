import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IColorRepository } from '../../domain/repositories/color.repository';

@Injectable()
export class DeleteColorUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute(id: string, userId: string) {
    const color = await this.colorRepository.findById(id);
    if (!color) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }

    color.delete(userId);
    await this.colorRepository.delete(id);
  }
}
