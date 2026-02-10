import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GetGenderUseCase } from './application/use-cases/get-gender.use-case';
import { GetGendersUseCase } from './application/use-cases/get-genders.use-case';
import { GenderDataSource } from './infrastructure/datasources/typeorm/gender.datasource';
import { GenderEntity } from './infrastructure/models/gender.model';
import { GenderRepository } from './infrastructure/repositories/gender.repository';
import { GenderSeeder } from './infrastructure/seeds/gender.seeder';
import { GenderController } from './interfaces/controllers/gender.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GenderEntity]), AuthModule],
  controllers: [GenderController],
  providers: [
    GenderSeeder,
    GetGendersUseCase,
    GetGenderUseCase,
    {
      provide: 'IGenderDataSource',
      useClass: GenderDataSource,
    },
    {
      provide: 'IGenderRepository',
      useClass: GenderRepository,
    },
  ],
  exports: [GetGendersUseCase, GetGenderUseCase],
})
export class GenderModule {}
