import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from 'src/shared/infrastructure/models/auditable.model';

@Entity('colors')
export class ColorEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'hex_code' })
  hexCode: string;
}
