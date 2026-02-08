import { Inject, Injectable } from '@nestjs/common';
import type { IColorRepository } from '../../domain/repositories/color.repository';

@Injectable()
export class GetColorsUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute() {
    return this.colorRepository.findAll();
  }
}
