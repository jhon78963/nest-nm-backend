import { Inject, Injectable } from '@nestjs/common';
import type { ISizeRepository } from '../../domain/repositories';

@Injectable()
export class GetSizesUseCase {
  constructor(
    @Inject('ISizeRepository') private sizeRepository: ISizeRepository,
  ) {}

  async execute() {
    return this.sizeRepository.findAll();
  }
}
