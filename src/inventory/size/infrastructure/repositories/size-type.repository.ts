import { Inject, Injectable } from '@nestjs/common';
import { SizeType } from '../../domain/entities';
import type { ISizeTypeRepository } from '../../domain/repositories';
import type { ISizeTypeDatasource } from '../datasources';
import { SizeTypeMapper } from '../mappers';

@Injectable()
export class SizeTypeRepository implements ISizeTypeRepository {
  constructor(
    @Inject('ISizeTypeDataSource') private dataSource: ISizeTypeDatasource,
  ) {}

  async findAll(): Promise<SizeType[]> {
    return this.dataSource
      .findAll()
      .then((entities) =>
        entities.map((entity) => SizeTypeMapper.toDomain(entity)),
      );
  }

  async findById(id: string): Promise<SizeType | null> {
    const entity = await this.dataSource.findById(id);
    return entity ? SizeTypeMapper.toDomain(entity) : null;
  }
}
