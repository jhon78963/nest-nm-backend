import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  password: string;

  @Column({
    name: 'profile_picture',
    nullable: true,
    default: '/assets/img/avatars/1.png',
  })
  profilePicture: string;

  @Column({ type: 'varchar', name: 'hashed_rt', nullable: true })
  hashedRt: string | null;

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
