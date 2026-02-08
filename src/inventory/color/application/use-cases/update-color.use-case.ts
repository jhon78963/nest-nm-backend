import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateColorDto } from '../dtos/update-color.dto';
import type { IColorRepository } from '../../domain/repositories/color.repository';
import { Color } from '../../domain/entities/color.entity';

@Injectable()
export class UpdateColorUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute(id: string, dto: UpdateColorDto): Promise<Color> {
    const existingColor = await this.colorRepository.findById(id);
    if (!existingColor) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }

    if (dto.name && dto.name !== existingColor.name) {
      const nameConflict = await this.colorRepository.findByName(dto.name);
      if (nameConflict) {
        throw new ConflictException('Color name already exists');
      }
    }

    await this.colorRepository.update(id, {
      ...dto,
    });

    return {
      ...existingColor,
      ...dto,
    } as Color;
  }
}
