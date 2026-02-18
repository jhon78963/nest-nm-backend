import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeTypeEntity } from '../../models';
import type { ISizeTypeDatasource } from '../size-type.datasource';

@Injectable()
export class SizeTypeDataSource implements ISizeTypeDatasource {
  constructor(
    @InjectRepository(SizeTypeEntity)
    private readonly repo: Repository<SizeTypeEntity>,
  ) {}

  findAll(): Promise<SizeTypeEntity[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { name: 'ASC' },
    });
  }

  findById(id: string): Promise<SizeTypeEntity | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }
}
