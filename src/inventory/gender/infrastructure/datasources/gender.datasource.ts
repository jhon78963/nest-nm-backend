import { GenderEntity } from '../models/gender.model';

export interface IGenderDatasource {
  findAll(): Promise<GenderEntity[]>;
  findById(id: string): Promise<GenderEntity | null>;
}
