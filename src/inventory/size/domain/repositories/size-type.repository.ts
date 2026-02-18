import { SizeType } from '../entities/size-type.entity';

export interface ISizeTypeRepository {
  findAll(): Promise<SizeType[]>;
  findById(id: string): Promise<SizeType | null>;
}
