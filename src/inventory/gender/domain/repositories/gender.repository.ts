import { Gender } from '../entities/gender.entity';

export interface IGenderRepository {
  findAll(): Promise<Gender[]>;
  findById(id: string): Promise<Gender | null>;
}
