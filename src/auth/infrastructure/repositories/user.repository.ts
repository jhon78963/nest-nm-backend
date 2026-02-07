import { Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { IAuthDataSource } from '../datasource/auth.datasource';
import { User } from 'src/auth/domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly dataSource: IAuthDataSource) {}

  async create(user: User): Promise<User> {
    const userModel = UserMapper.toModel(user);
    const entity = await this.dataSource.create(userModel);
    return UserMapper.toDomain(entity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.dataSource.findByEmail(email);
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.dataSource.findById(id);
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.dataSource.findByUsername(username);
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    const entity = await this.dataSource.findByUsernameOrEmail(identifier);
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async updateRefreshToken(
    userId: string,
    hashedRt: string | null,
  ): Promise<void> {
    await this.dataSource.updateRefreshToken(userId, hashedRt);
  }
}
