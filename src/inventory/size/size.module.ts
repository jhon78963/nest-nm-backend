import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import {
  CreateSizeUseCase,
  DeleteSizeUseCase,
  GetSizesUseCase,
  GetSizeUseCase,
  UpdateSizeUseCase,
} from './application/use-cases';
import { SizeDataSource } from './infrastructure/datasources/typeorm';
import { SizeEntity } from './infrastructure/models';
import { SizeRepository } from './infrastructure/repositories';
import { SizeController } from './interfaces/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity]), AuthModule],
  controllers: [SizeController],
  providers: [
    // SizeSeeder,
    CreateSizeUseCase,
    DeleteSizeUseCase,
    GetSizesUseCase,
    GetSizeUseCase,
    UpdateSizeUseCase,
    {
      provide: 'ISizeDataSource',
      useClass: SizeDataSource,
    },
    {
      provide: 'ISizeRepository',
      useClass: SizeRepository,
    },
  ],
  exports: [
    CreateSizeUseCase,
    DeleteSizeUseCase,
    GetSizesUseCase,
    GetSizeUseCase,
    UpdateSizeUseCase,
  ],
})
export class SizeModule {}
