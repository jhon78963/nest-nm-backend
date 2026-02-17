import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from '../../models/color.model';
import type { IColorDatasource } from '../color.datasource';

@Injectable()
export class ColorDataSource implements IColorDatasource {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly repo: Repository<ColorEntity>,
  ) {}

  async create(color: ColorEntity): Promise<ColorEntity> {
    const newColor = this.repo.create(color);
    return await this.repo.save(newColor);
  }

  // En tu DataSource
  async findAll(skip: number, limit: number): Promise<{ data: ColorEntity[]; total: number }> {
    // findAndCount devuelve un arreglo: [0] son los datos, [1] es el total
    const [data, total] = await this.repo.findAndCount({
      where: { isDeleted: false },
      order: { name: 'ASC' },
      take: limit, // En TypeORM 'limit' se llama 'take'
      skip: skip,  // En TypeORM 'offset' se llama 'skip'
    });

    return { data, total };
  }

  findById(id: string): Promise<ColorEntity | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  findByName(name: string): Promise<ColorEntity | null> {
    return this.repo.findOne({ where: { name, isDeleted: false } });
  }

  async update(id: string, color: ColorEntity): Promise<void> {
    await this.repo.update(id, color);
  }

  async delete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
