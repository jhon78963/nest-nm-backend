import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Size } from '../../domain/entities';
import type { ISizeRepository } from '../../domain/repositories';
import { UpdateSizeDto } from '../dtos';

@Injectable()
export class UpdateSizeUseCase {
  constructor(
    @Inject('ISizeRepository') private sizeRepository: ISizeRepository,
  ) {}

  async execute(id: string, dto: UpdateSizeDto, userId: string): Promise<Size> {
    const size = await this.sizeRepository.findById(id);
    if (!size) {
      throw new NotFoundException(`Size with id ${id} not found`);
    }

    if (dto.name && dto.name !== size.name) {
      const nameConflict = await this.sizeRepository.findByName(dto.name);
      if (nameConflict) {
        throw new ConflictException('Size name already exists');
      }
    }

    size.update(
      dto.name ?? size.name,
      dto.sizeTypeId ?? size.sizeTypeId,
      userId,
    );
    await this.sizeRepository.update(id, size);
    return size;
  }
}
