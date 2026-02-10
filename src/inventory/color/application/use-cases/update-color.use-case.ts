import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Color } from '../../domain/entities/color.entity';
import type { IColorRepository } from '../../domain/repositories/color.repository';
import { UpdateColorDto } from '../dtos/update-color.dto';

@Injectable()
export class UpdateColorUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateColorDto,
    userId: string,
  ): Promise<Color> {
    const color = await this.colorRepository.findById(id);
    if (!color) {
      throw new NotFoundException(`Color with id ${id} not found`);
    }

    if (dto.name && dto.name !== color.name) {
      const nameConflict = await this.colorRepository.findByName(dto.name);
      if (nameConflict) {
        throw new ConflictException('Color name already exists');
      }
    }

    color.update(dto.name ?? color.name, dto.hexCode ?? color.hexCode, userId);
    await this.colorRepository.update(id, color);
    return color;
  }
}
