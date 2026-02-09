import { ColorEntity } from '../models/color.model';

export interface IColorDatasource {
  create(color: ColorEntity): Promise<ColorEntity>;
  findAll(): Promise<ColorEntity[]>;
  findById(id: string): Promise<ColorEntity | null>;
  findByName(name: string): Promise<ColorEntity | null>;
  update(id: string, color: ColorEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
