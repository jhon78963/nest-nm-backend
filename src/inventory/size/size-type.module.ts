import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import {
  GetSizeTypesUseCase,
  GetSizeTypeUseCase,
} from './application/use-cases';
import { SizeTypeDataSource } from './infrastructure/datasources/typeorm';
import { SizeTypeEntity } from './infrastructure/models';
import { SizeTypeRepository } from './infrastructure/repositories';
import { SizeTypeSeeder } from './infrastructure/seeds';
import { SizeTypeController } from './interfaces/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([SizeTypeEntity]), AuthModule],
  controllers: [SizeTypeController],
  providers: [
    SizeTypeSeeder,
    GetSizeTypesUseCase,
    GetSizeTypeUseCase,
    {
      provide: 'ISizeTypeDataSource',
      useClass: SizeTypeDataSource,
    },
    {
      provide: 'ISizeTypeRepository',
      useClass: SizeTypeRepository,
    },
  ],
  exports: [GetSizeTypesUseCase, GetSizeTypeUseCase],
})
export class SizeTypeModule {}
