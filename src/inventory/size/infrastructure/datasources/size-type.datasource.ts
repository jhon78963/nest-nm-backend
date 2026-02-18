import { SizeTypeEntity } from '../models';

export interface ISizeTypeDatasource {
  findAll(): Promise<SizeTypeEntity[]>;
  findById(id: string): Promise<SizeTypeEntity | null>;
}
