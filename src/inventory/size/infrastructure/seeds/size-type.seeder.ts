import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SizeType } from '../../domain/entities';

@Injectable()
export class SizeTypeSeeder {
  private readonly logger = new Logger(SizeTypeSeeder.name);

  constructor(private readonly dataSource: DataSource) {}

  async run() {
    this.logger.log('🌱 Iniciando seed de SizeTypeModule...');

    const sizeTypesToSeed = [
      { name: 'Adulto letras' },
      { name: 'Adulto números' },
      { name: 'Niños' },
    ];

    const systemUserId = '46d5ebc9-3602-4113-bd34-ce7debde7cf2';

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const data of sizeTypesToSeed) {
        const sizeTypeDomain = SizeType.create(data.name, systemUserId);

        const existing = await queryRunner.query(
          `SELECT id FROM size_types WHERE name = $1 LIMIT 1`,
          [data.name],
        );

        if (existing.length > 0) {
          this.logger.debug(`⚠️  Tipo de talla ya existe: ${data.name}`);
          continue;
        }

        // Insertar respetando AuditableEntity
        await queryRunner.query(
          `INSERT INTO size_types (
            id, 
            name, 
            creation_time, 
            creator_user_id, 
            is_deleted
          ) 
           VALUES ($1, $2, $3, $4, $5)`,
          [
            sizeTypeDomain.id,
            sizeTypeDomain.name,
            new Date(), // creation_time
            systemUserId, // creator_user_id
            false, // is_deleted
          ],
        );

        this.logger.log(`✅ Tipo de talla insertado: ${data.name}`);
      }

      await queryRunner.commitTransaction();
      this.logger.log('🏁 Seed de SizeTypeModule terminado.');
    } catch (err) {
      this.logger.error('❌ Error en el seed:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
