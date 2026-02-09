import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AuditableEntity } from 'src/shared/infrastructure/models/auditable.model';

@Entity('users')
export class UserEntity extends AuditableEntity {
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
}
