import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { LoginDto } from '../dtos/login.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    // 1. Buscar Usuario
    const user = await this.authRepository.findByUsernameOrEmail(
      dto.identifier,
    );
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // 2. Validar Password (Usamos el getter user.password)
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    // 3. Definir Tiempos (En segundos)
    const atExpiresIn = 3600; // 15 min
    const rtExpiresIn = 604800; // 7 días

    // 4. Generar Payload y Tokens
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username, // Agregamos info útil al token
    };

    const atSecret = this.configService.get<string>('JWT_SECRET');
    const rtSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: atSecret,
        expiresIn: atExpiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: rtSecret,
        expiresIn: rtExpiresIn,
      }),
    ]);

    // 5. Guardar Hash del Refresh Token (Seguridad)
    const rtHash = await bcrypt.hash(refreshToken, 10);
    // Usamos el método de dominio si quisiéramos mutar el objeto,
    // pero aquí llamamos al repo directo para persistir.
    await this.authRepository.updateRefreshToken(user.id, rtHash);

    // 6. Retornar la Estructura EXACTA solicitada
    return {
      token: accessToken,
      refreshToken: refreshToken,
      expirationToken: atExpiresIn,
      expirationRefreshToken: rtExpiresIn,
    };
  }
}
