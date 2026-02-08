import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IColorRepository } from '../../domain/repositories/color.repository';
import { Color } from '../../domain/entities/color.entity';

@Injectable()
export class GetColorUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute(id: string): Promise<Color> {
    const existingColor = await this.colorRepository.findById(id);
    if (!existingColor) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }

    return existingColor;
  }
}
