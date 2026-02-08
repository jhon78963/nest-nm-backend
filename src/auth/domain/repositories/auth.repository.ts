import { User } from '../entities/user.entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByUsernameOrEmail(identifier: string): Promise<User | null>;
  create(user: User): Promise<User>;
  updateRefreshToken(userId: string, hashedRt: string | null): Promise<void>;
}
