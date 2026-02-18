import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from '../../models';
import type { ISizeDatasource } from '../size.datasource';

@Injectable()
export class SizeDataSource implements ISizeDatasource {
  constructor(
    @InjectRepository(SizeEntity)
    private readonly repo: Repository<SizeEntity>,
  ) {}

  async create(size: SizeEntity): Promise<SizeEntity> {
    const newSize = this.repo.create(size);
    return await this.repo.save(newSize);
  }

  findAll(): Promise<SizeEntity[]> {
    return this.repo.find({
      where: { isDeleted: false },
      order: { name: 'ASC' },
    });
  }

  findById(id: string): Promise<SizeEntity | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  findByName(name: string): Promise<SizeEntity | null> {
    return this.repo.findOne({ where: { name, isDeleted: false } });
  }

  async update(id: string, size: SizeEntity): Promise<void> {
    await this.repo.update(id, size);
  }

  async delete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
