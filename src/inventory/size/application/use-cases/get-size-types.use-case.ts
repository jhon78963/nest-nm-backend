import { Inject, Injectable } from '@nestjs/common';
import type { ISizeTypeRepository } from '../../domain/repositories';

@Injectable()
export class GetSizeTypesUseCase {
  constructor(
    @Inject('ISizeTypeRepository')
    private sizeTypeRepository: ISizeTypeRepository,
  ) {}

  async execute() {
    return this.sizeTypeRepository.findAll();
  }
}
