import { ColorEntity } from '../models/color.model';

export interface IColorDatasource {
  create(color: Partial<ColorEntity>): Promise<ColorEntity>;
  findAll(): Promise<ColorEntity[]>;
  findById(id: string): Promise<ColorEntity | null>;
  findByName(name: string): Promise<ColorEntity | null>;
  update(id: string, color: Partial<ColorEntity>): Promise<void>;
  delete(id: string): Promise<void>;
}
