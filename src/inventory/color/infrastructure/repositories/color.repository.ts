import { Inject, Injectable } from '@nestjs/common';
import type { IColorRepository } from '../../domain/repositories/color.repository';
import type { IColorDatasource } from '../datasources/color.datasource';
import { Color } from '../../domain/entities/color.entity';
import { ColorMapper } from '../mappers/color.mapper';

@Injectable()
export class ColorRepository implements IColorRepository {
  constructor(
    @Inject('IColorDataSource') private dataSource: IColorDatasource,
  ) {}

  async create(color: Partial<Color>): Promise<Color> {
    const colorModel = ColorMapper.toModel(color);
    const entity = await this.dataSource.create(colorModel);
    return ColorMapper.toDomain(entity);
  }

  async findAll(): Promise<Color[]> {
    return this.dataSource
      .findAll()
      .then((entities) =>
        entities.map((entity) => ColorMapper.toDomain(entity)),
      );
  }
  async findById(id: string): Promise<Color | null> {
    const entity = await this.dataSource.findById(id);
    return entity ? ColorMapper.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Color | null> {
    const entity = await this.dataSource.findByName(name);
    return entity ? ColorMapper.toDomain(entity) : null;
  }

  async update(id: string, color: Partial<Color>): Promise<void> {
    const colorModel = ColorMapper.toModel(color);
    await this.dataSource.update(id, colorModel);
  }

  async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
}
