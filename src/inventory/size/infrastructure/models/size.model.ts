import { AuditableEntity } from 'src/shared/infrastructure/models/auditable.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SizeTypeEntity } from './size-type.model';

@Entity('sizes')
export class SizeEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'size_type_id' })
  sizeTypeId: string;

  @ManyToOne(() => SizeTypeEntity, (sizeType) => sizeType.sizes)
  @JoinColumn({ name: 'size_type_id' })
  sizeType: SizeTypeEntity;
}
