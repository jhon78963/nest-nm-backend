import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CreateColorUseCase } from './application/use-cases/create-color.use-case';
import { DeleteColorUseCase } from './application/use-cases/delete-color.use-case';
import { GetColorUseCase } from './application/use-cases/get-color.use-case';
import { GetColorsUseCase } from './application/use-cases/get-colors.use-case';
import { UpdateColorUseCase } from './application/use-cases/update-color.use-case';
import { ColorDataSource } from './infrastructure/datasources/typeorm/color.datasource';
import { ColorEntity } from './infrastructure/models/color.model';
import { ColorRepository } from './infrastructure/repositories/color.repository';
import { ColorSeeder } from './infrastructure/seeds/color.seeder';
import { ColorController } from './interfaces/controllers/color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity]), AuthModule],
  controllers: [ColorController],
  providers: [
    ColorSeeder,
    CreateColorUseCase,
    DeleteColorUseCase,
    GetColorsUseCase,
    GetColorUseCase,
    UpdateColorUseCase,
    {
      provide: 'IColorDataSource',
      useClass: ColorDataSource,
    },
    {
      provide: 'IColorRepository',
      useClass: ColorRepository,
    },
  ],
  exports: [
    CreateColorUseCase,
    DeleteColorUseCase,
    GetColorsUseCase,
    GetColorUseCase,
    UpdateColorUseCase,
  ],
})
export class ColorModule {}
