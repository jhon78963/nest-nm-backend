import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthSeeder } from './auth/infrastructure/seeds/auth.seeder';
import { ColorSeeder } from './inventory/color/infrastructure/seeds/color.seeder';
import { GenderSeeder } from './inventory/gender/infrastructure/seeds/gender.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('SeederRunner');

  try {
    const authSeeder = app.get(AuthSeeder);
    await authSeeder.run();

    // Aquí agregarías otros seeders:
    const genderSeeder = app.get(GenderSeeder);
    await genderSeeder.run();

    const colorSeeder = app.get(ColorSeeder);
    await colorSeeder.run();

    logger.log('✨ Todo el seeding terminó correctamente.');
  } catch (error) {
    logger.error('❌ Error durante el seeding:', error);
  } finally {
    await app.close();
  }
}

void bootstrap();
