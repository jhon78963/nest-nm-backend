import { User } from '../entities/user.entity';

export abstract class IAuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findByUsernameOrEmail(identifier: string): Promise<User | null>;

  abstract create(user: User): Promise<User>;

  abstract updateRefreshToken(
    userId: string,
    hashedRt: string | null,
  ): Promise<void>;
}
