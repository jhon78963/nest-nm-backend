import { UserEntity } from '../models/user.model';

export abstract class IAuthDataSource {
  abstract create(user: Partial<UserEntity>): Promise<UserEntity>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findByUsernameOrEmail(
    identifier: string,
  ): Promise<UserEntity | null>;

  abstract updateRefreshToken(
    id: string,
    hashedRt: string | null,
  ): Promise<void>;
}
