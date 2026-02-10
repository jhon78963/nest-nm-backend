import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';

export interface AuthTokens {
  token: string;
  refreshToken: string;
  expirationToken: number;
  expirationRefreshToken: number;
}

@Injectable()
export class AuthManager {
  private readonly AT_EXPIRATION = 3600; // 1 hora
  private readonly RT_EXPIRATION = 604800; // 7 días

  constructor(
    @Inject('IAuthRepository') private authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  public async getTokens(
    userId: string,
    email: string,
    username: string,
  ): Promise<AuthTokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, username },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.AT_EXPIRATION,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, username },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.RT_EXPIRATION,
        },
      ),
    ]);

    return {
      token: at,
      refreshToken: rt,
      expirationToken: this.AT_EXPIRATION,
      expirationRefreshToken: this.RT_EXPIRATION,
    };
  }

  public async updateRefreshTokenHash(
    userId: string,
    rt: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(rt, salt);
    await this.authRepository.updateRefreshToken(userId, hash);
  }

  public async verifyCredentials(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public async verifyRefreshToken(
    plainRt: string,
    hashedRt: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainRt, hashedRt);
  }
}
