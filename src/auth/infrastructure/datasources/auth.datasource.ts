import { UserEntity } from '../models/user.model';

export interface IAuthDataSource {
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  findByUsernameOrEmail(identifier: string): Promise<UserEntity | null>;
  updateRefreshToken(id: string, hashedRt: string | null): Promise<void>;
}
