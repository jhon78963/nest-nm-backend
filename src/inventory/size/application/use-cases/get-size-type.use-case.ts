import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SizeType } from '../../domain/entities';
import type { ISizeTypeRepository } from '../../domain/repositories';

@Injectable()
export class GetSizeTypeUseCase {
  constructor(
    @Inject('ISizeTypeRepository')
    private sizeTypeRepository: ISizeTypeRepository,
  ) {}

  async execute(id: string): Promise<SizeType> {
    const existingSizeType = await this.sizeTypeRepository.findById(id);
    if (!existingSizeType) {
      throw new NotFoundException(`Size type with id ${id} not found`);
    }

    return existingSizeType;
  }
}
