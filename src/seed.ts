import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthSeeder } from './auth/infrastructure/seeds/auth.seeder';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('SeederRunner');

  try {
    const authSeeder = app.get(AuthSeeder);
    await authSeeder.run();

    // Aquí agregarías otros seeders:
    // const productSeeder = app.get(ProductSeeder);
    // await productSeeder.run();

    logger.log('✨ Todo el seeding terminó correctamente.');
  } catch (error) {
    logger.error('❌ Error durante el seeding:', error);
  } finally {
    // 4. Cerramos la app
    await app.close();
  }
}

void bootstrap();
