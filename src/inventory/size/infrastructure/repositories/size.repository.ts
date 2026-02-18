import { Inject, Injectable } from '@nestjs/common';
import { Size } from '../../domain/entities';
import type { ISizeRepository } from '../../domain/repositories';
import type { ISizeDatasource } from '../datasources';
import { SizeMapper } from '../mappers';

@Injectable()
export class SizeRepository implements ISizeRepository {
  constructor(@Inject('ISizeDataSource') private dataSource: ISizeDatasource) {}

  async create(size: Size): Promise<Size> {
    const sizeModel = SizeMapper.toModel(size);
    const entity = await this.dataSource.create(sizeModel);
    return SizeMapper.toDomain(entity);
  }

  async findAll(): Promise<Size[]> {
    return this.dataSource
      .findAll()
      .then((entities) =>
        entities.map((entity) => SizeMapper.toDomain(entity)),
      );
  }

  async findById(id: string): Promise<Size | null> {
    const entity = await this.dataSource.findById(id);
    return entity ? SizeMapper.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Size | null> {
    const entity = await this.dataSource.findByName(name);
    return entity ? SizeMapper.toDomain(entity) : null;
  }

  async update(id: string, size: Size): Promise<void> {
    const sizeModel = SizeMapper.toModel(size);
    await this.dataSource.update(id, sizeModel);
  }

  async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
}
