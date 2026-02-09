import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { CreateColorDto } from '../dtos/create-color.dto';
import { Color } from '../../domain/entities/color.entity';
import type { IColorRepository } from '../../domain/repositories/color.repository';

@Injectable()
export class CreateColorUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute(dto: CreateColorDto, userId: string): Promise<Color> {
    const existsName = await this.colorRepository.findByName(dto.name);
    if (existsName) throw new ConflictException('Color name already exists');
    const newColor = Color.create(dto.name, dto.hexCode, userId);
    return await this.colorRepository.create(newColor);
  }
}
