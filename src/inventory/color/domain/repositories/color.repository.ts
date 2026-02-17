import { Color } from '../entities/color.entity';

export interface IColorRepository {
  create(color: Color): Promise<Color>;
  findAll(page: number, limit: number): Promise<{ data: Color[]; total: number }>;
  findById(id: string): Promise<Color | null>;
  findByName(name: string): Promise<Color | null>;
  update(id: string, color: Color): Promise<void>;
  delete(id: string): Promise<void>;
}
