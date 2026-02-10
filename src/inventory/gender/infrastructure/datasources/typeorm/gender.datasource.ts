import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenderEntity } from '../../models/gender.model';
import type { IGenderDatasource } from '../gender.datasource';

@Injectable()
export class GenderDataSource implements IGenderDatasource {
  constructor(
    @InjectRepository(GenderEntity)
    private readonly repo: Repository<GenderEntity>,
  ) {}

  findAll(): Promise<GenderEntity[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { name: 'ASC' },
    });
  }

  findById(id: string): Promise<GenderEntity | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }
}
