import { Inject, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/domain/entities/user.entity';
import type { IAuthRepository } from 'src/auth/domain/repositories/auth.repository';

@Injectable()
export class AuthSeeder {
  private readonly logger = new Logger(AuthSeeder.name);

  constructor(
    // Inyectamos el Repositorio usando el token abstracto
    @Inject('IAuthRepository') private readonly authRepository: IAuthRepository,
  ) {}

  async run() {
    this.logger.log('🌱 Iniciando seed de AuthModule...');

    const email = 'admin@novedadesmaritex.com';

    // 1. Verificar si existe (usando tu repo limpio)
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      this.logger.debug('⚠️  Usuario Admin ya existe. Saltando...');
      return;
    }

    // 2. Crear data
    const password = await bcrypt.hash('123qwe123', 10);

    const adminUser = new User(
      'admin',
      email,
      'Super',
      'Admin',
      'https://i.imgur.com/Hepj9ZS.png',
      password,
      '',
    );

    // 3. Guardar
    await this.authRepository.create(adminUser);

    this.logger.log('✅ Usuario Admin creado exitosamente');
  }
}
