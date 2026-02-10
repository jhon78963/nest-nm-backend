import { AuditableEntity } from 'src/shared/infrastructure/models/auditable.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genders')
export class GenderEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'short_name' })
  shortName: string;
}
