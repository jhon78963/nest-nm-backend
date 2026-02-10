import { Injectable, Logger } from '@nestjs/common';
import { Gender } from 'src/inventory/gender/domain/entities/gender.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GenderSeeder {
  private readonly logger = new Logger(GenderSeeder.name);

  constructor(private readonly dataSource: DataSource) {}

  async run() {
    this.logger.log('🌱 Iniciando seed de GenderModule...');

    const gendersToSeed = [
      { name: 'Caballeros', shortName: 'M' },
      { name: 'Damas', shortName: 'F' },
      { name: 'Niños', shortName: 'N' },
      { name: 'Ofertas', shortName: 'O' },
    ];

    const systemUserId = '46d5ebc9-3602-4113-bd34-ce7debde7cf2';

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const data of gendersToSeed) {
        const genderDomain = Gender.create(
          data.name,
          data.shortName,
          systemUserId,
        );

        const existing = await queryRunner.query(
          `SELECT id FROM genders WHERE name = $1 LIMIT 1`,
          [data.name],
        );

        if (existing.length > 0) {
          this.logger.debug(`⚠️  Género ya existe: ${data.name}`);
          continue;
        }

        // Insertar respetando AuditableEntity
        await queryRunner.query(
          `INSERT INTO genders (
            id, 
            name, 
            short_name, 
            creation_time, 
            creator_user_id, 
            is_deleted
          ) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            genderDomain.id,
            genderDomain.name,
            genderDomain.shortName,
            new Date(), // creation_time
            systemUserId, // creator_user_id
            false, // is_deleted
          ],
        );

        this.logger.log(`✅ Género insertado: ${data.name}`);
      }

      await queryRunner.commitTransaction();
      this.logger.log('🏁 Seed de GenderModule terminado.');
    } catch (err) {
      this.logger.error('❌ Error en el seed:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
