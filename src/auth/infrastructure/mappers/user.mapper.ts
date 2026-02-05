import { User } from 'src/auth/domain/entities/user.entity';
import { UserEntity } from '../models/user.model';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.username,
      entity.email,
      entity.name,
      entity.surname,
      entity.password,
      entity.profilePicture,
      entity.hashedRt,
    );
  }

  static toModel(user: User): Partial<UserEntity> {
    const entity = new UserEntity();

    if (user.id) entity.id = user.id;
    entity.username = user.username;
    entity.email = user.email;
    entity.name = user.name;
    entity.surname = user.surname;
    entity.password = user.password;
    entity.profilePicture = user.profilePicture;
    entity.hashedRt = user.hashedRt || null;

    return entity;
  }
}
