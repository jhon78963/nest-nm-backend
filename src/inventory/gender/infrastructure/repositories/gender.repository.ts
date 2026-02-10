import { Inject, Injectable } from '@nestjs/common';
import { Gender } from '../../domain/entities/gender.entity';
import type { IGenderRepository } from '../../domain/repositories/gender.repository';
import type { IGenderDatasource } from '../datasources/gender.datasource';
import { GenderMapper } from '../mappers/gender.mapper';

@Injectable()
export class GenderRepository implements IGenderRepository {
  constructor(
    @Inject('IGenderDataSource') private dataSource: IGenderDatasource,
  ) {}

  async findAll(): Promise<Gender[]> {
    return this.dataSource
      .findAll()
      .then((entities) =>
        entities.map((entity) => GenderMapper.toDomain(entity)),
      );
  }

  async findById(id: string): Promise<Gender | null> {
    const entity = await this.dataSource.findById(id);
    return entity ? GenderMapper.toDomain(entity) : null;
  }
}
