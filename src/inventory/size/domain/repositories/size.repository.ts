import { Size } from '../entities/size.entity';

export interface ISizeRepository {
  create(size: Size): Promise<Size>;
  findAll(): Promise<Size[]>;
  findById(id: string): Promise<Size | null>;
  findByName(name: string): Promise<Size | null>;
  update(id: string, size: Size): Promise<void>;
  delete(id: string): Promise<void>;
}
