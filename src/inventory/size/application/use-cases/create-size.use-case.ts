import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Size } from '../../domain/entities';
import type { ISizeRepository } from '../../domain/repositories';
import { CreateSizeDto } from '../dtos';

@Injectable()
export class CreateSizeUseCase {
  constructor(
    @Inject('ISizeRepository') private sizeRepository: ISizeRepository,
  ) {}

  async execute(dto: CreateSizeDto, userId: string): Promise<Size> {
    const existsName = await this.sizeRepository.findByName(dto.name);
    if (existsName) throw new ConflictException('Size name already exists');
    const newSize = Size.create(dto.name, dto.sizeTypeId, userId);
    return await this.sizeRepository.create(newSize);
  }
}
