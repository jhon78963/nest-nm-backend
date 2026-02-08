import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IColorRepository } from '../../domain/repositories/color.repository';

@Injectable()
export class DeleteColorUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute(id: string) {
    const existingColor = await this.colorRepository.findById(id);
    if (!existingColor) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }

    await this.colorRepository.delete(id);
  }
}
