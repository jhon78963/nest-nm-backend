import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Size } from '../../domain/entities';
import type { ISizeRepository } from '../../domain/repositories';

@Injectable()
export class GetSizeUseCase {
  constructor(
    @Inject('ISizeRepository') private sizeRepository: ISizeRepository,
  ) {}

  async execute(id: string): Promise<Size> {
    const existingSize = await this.sizeRepository.findById(id);
    if (!existingSize) {
      throw new NotFoundException(`Size with id ${id} not found`);
    }

    return existingSize;
  }
}
