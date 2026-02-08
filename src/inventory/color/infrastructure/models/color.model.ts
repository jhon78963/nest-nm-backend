import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('colors')
export class ColorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ name: 'hex_code' })
  hexCode: string;

  @CreateDateColumn({ type: 'timestamp', name: 'creation_time' })
  creationTime: Date;

  @Column({ type: 'int', name: 'creator_user_id', nullable: true })
  creatorUserId: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'last_modification_time',
    nullable: true,
  })
  lastModificationTime: Date;

  @Column({ type: 'int', name: 'last_modifier_user_id', nullable: true })
  lastModifierUserId: string;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deletion_time',
    nullable: true,
  })
  deletionTime: Date;

  @Column({ type: 'int', name: 'deleter_user_id', nullable: true })
  deleterUserId: string;

  @Column({ type: 'boolean', name: 'is_deleted', default: false })
  isDeleted: boolean;
}
