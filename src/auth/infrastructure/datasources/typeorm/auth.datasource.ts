import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../models/user.model';
import type { IAuthDataSource } from '../auth.datasource';

@Injectable()
export class AuthDataSource implements IAuthDataSource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email, isDeleted: false } });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { username, isDeleted: false } });
  }

  async findByUsernameOrEmail(identifier: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: [
        { email: identifier, isDeleted: false },
        { username: identifier, isDeleted: false },
      ],
    });
  }

  async updateRefreshToken(id: string, hashedRt: string | null): Promise<void> {
    await this.repo.update(id, { hashedRt });
  }

  async create(userEntity: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.repo.create(userEntity);
    return await this.repo.save(newUser);
  }
}
