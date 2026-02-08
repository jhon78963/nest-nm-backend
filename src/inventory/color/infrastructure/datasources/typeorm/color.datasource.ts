import { Injectable } from '@nestjs/common';
import { IColorDatasource } from '../color.datasource';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from '../../models/color.model';
import { Repository } from 'typeorm';

@Injectable()
export class ColorDataSource implements IColorDatasource {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly repo: Repository<ColorEntity>,
  ) {}

  create(color: Partial<ColorEntity>): Promise<ColorEntity> {
    const newColor = this.repo.create(color);
    return this.repo.save(newColor);
  }

  findAll(): Promise<ColorEntity[]> {
    return this.repo.find({ where: { isDeleted: false } });
  }

  findById(id: string): Promise<ColorEntity | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  findByName(name: string): Promise<ColorEntity | null> {
    return this.repo.findOne({ where: { name, isDeleted: false } });
  }

  update(id: string, color: Partial<ColorEntity>): Promise<void> {
    return this.repo.update(id, color).then(() => undefined);
  }

  delete(id: string): Promise<void> {
    return this.repo.update(id, { isDeleted: true }).then(() => undefined);
  }
}
