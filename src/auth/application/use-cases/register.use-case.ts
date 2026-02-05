import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { RegisterDto } from '../dtos/register.dto'; // Asegúrate de tener este DTO creado
import { User } from 'src/auth/domain/entities/user.entity';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: RegisterDto): Promise<AuthResponseDto> {
    // 1. Validar Email Duplicado
    const existsEmail = await this.authRepository.findByEmail(dto.email);
    if (existsEmail) throw new ConflictException('El email ya está registrado');

    // 2. Validar Username Duplicado (si tienes el método en el repo)
    const existsUser = await this.authRepository.findByUsername(dto.username);
    if (existsUser) throw new ConflictException('El usuario ya existe');

    // 3. Hashear Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // 4. Crear Instancia de Dominio (Sin ID, ID es null)
    const newUser = new User(
      '',
      dto.username,
      dto.email,
      dto.name,
      dto.surname,
      hashedPassword,
      'https://i.imgur.com/Hepj9ZS.png',
      '',
    );

    // 5. Guardar
    const user = await this.authRepository.create(newUser);

    // 6. Definir Tiempos (En segundos)
    const atExpiresIn = 3600; // 15 min
    const rtExpiresIn = 604800; // 7 días

    // 7. Generar Payload y Tokens
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

    // 8. Guardar Hash del Refresh Token (Seguridad)
    const rtHash = await bcrypt.hash(refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, rtHash);

    // 9. Retornar la Estructura EXACTA solicitada
    return {
      token: accessToken,
      refreshToken: refreshToken,
      expirationToken: atExpiresIn,
      expirationRefreshToken: rtExpiresIn,
    };
  }
}
