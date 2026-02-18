import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ISizeRepository } from '../../domain/repositories/size.repository';

@Injectable()
export class DeleteSizeUseCase {
  constructor(
    @Inject('ISizeRepository') private sizeRepository: ISizeRepository,
  ) {}

  async execute(id: string, userId: string) {
    const size = await this.sizeRepository.findById(id);
    if (!size) {
      throw new NotFoundException(`Size with id ${id} not found`);
    }

    size.delete(userId);
    await this.sizeRepository.delete(id);
  }
}
