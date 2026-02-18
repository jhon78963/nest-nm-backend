import { AuditableEntity } from 'src/shared/infrastructure/models/auditable.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SizeEntity } from './size.model';

@Entity('size_types')
export class SizeTypeEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => SizeEntity, (size) => size.sizeType)
  sizes: SizeEntity[];
}
