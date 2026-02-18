import { SizeEntity } from '../models';

export interface ISizeDatasource {
  create(size: SizeEntity): Promise<SizeEntity>;
  findAll(): Promise<SizeEntity[]>;
  findById(id: string): Promise<SizeEntity | null>;
  findByName(name: string): Promise<SizeEntity | null>;
  update(id: string, size: SizeEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
