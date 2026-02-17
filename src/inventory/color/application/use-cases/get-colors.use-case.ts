import { Inject, Injectable } from '@nestjs/common';
import type { IColorRepository } from '../../domain/repositories/color.repository';

interface GetColorsInput {
  page: number;
  limit: number;
}

@Injectable()
export class GetColorsUseCase {
  constructor(
    @Inject('IColorRepository') private colorRepository: IColorRepository,
  ) {}

  async execute({ page, limit }: GetColorsInput) {
    const skip = (page - 1) * limit;
    const { data, total } = await this.colorRepository.findAll(skip, limit);
    const totalPages = Math.ceil(total / limit);
    return {
      data: data,
      paginate: {
        total: total,
        pages: totalPages,
      },
    };
  }
}
