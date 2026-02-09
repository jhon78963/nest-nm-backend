import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AuditableEntity {
  @CreateDateColumn({ type: 'timestamp', name: 'creation_time', select: false })
  creationTime: Date;

  @Column({
    type: 'uuid',
    name: 'creator_user_id',
    nullable: true,
    select: false,
  })
  creatorUserId: string | null;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'last_modification_time',
    nullable: true,
    select: false,
  })
  lastModificationTime: Date;

  @Column({
    type: 'uuid',
    name: 'last_modifier_user_id',
    nullable: true,
    select: false,
  })
  lastModifierUserId: string | null;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deletion_time',
    nullable: true,
    select: false,
  })
  deletionTime: Date;

  @Column({
    type: 'uuid',
    name: 'deleter_user_id',
    nullable: true,
    select: false,
  })
  deleterUserId: string | null;

  @Column({
    type: 'boolean',
    name: 'is_deleted',
    default: false,
    select: false,
  })
  isDeleted: boolean;

  auditCreation(userId: string) {
    this.creatorUserId = userId;
  }

  auditUpdate(userId: string) {
    this.lastModifierUserId = userId;
    this.lastModificationTime = new Date();
  }

  auditDeletion(userId: string) {
    this.isDeleted = true;
    this.deleterUserId = userId;
    this.deletionTime = new Date();
  }
}
