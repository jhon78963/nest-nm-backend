// import { Injectable, Logger } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { Size } from '../../domain/entities';

// @Injectable()
// export class SizeSeeder {
//   private readonly logger = new Logger(SizeSeeder.name);

//   constructor(private readonly dataSource: DataSource) {}

//   async run() {
//     this.logger.log('🎨 Iniciando seed de SizeModule...');

//     const sizesToSeed = [
//       { name: 'XS', description: 'Extra Small' },
//       { name: 'S', description: 'Small' },
//       { name: 'M', description: 'Medium' },
//       { name: 'L', description: 'Large' },
//       { name: 'XL', description: 'Extra Large' },
//       { name: 'XXL', description: 'Extra Extra Large' },
//     ];

//     const systemUserId = '46d5ebc9-3602-4113-bd34-ce7debde7cf2';

//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       for (const data of sizesToSeed) {
//         // Usamos tu dominio para generar el ID (y validaciones si las tuviera)
//         const sizeDomain = Size.create(data.name, data.description, systemUserId);

//         // 1. Verificar existencia ($1)
//         const existing = await queryRunner.query(
//           `SELECT id FROM sizes WHERE name = $1 LIMIT 1`,
//           [data.name],
//         );

//     const systemUserId = '46d5ebc9-3602-4113-bd34-ce7debde7cf2';

//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       for (const data of colorsToSeed) {
//         // Usamos tu dominio para generar el ID (y validaciones si las tuviera)
//         const colorDomain = Color.create(data.name, data.hexCode, systemUserId);

//         // 1. Verificar existencia ($1)
//         const existing = await queryRunner.query(
//           `SELECT id FROM colors WHERE name = $1 LIMIT 1`,
//           [data.name],
//         );

//         if (existing.length > 0) {
//           continue;
//         }

//         // 2. Insertar con nombres de columnas de AuditableEntity
//         // OJO: Postgres cuenta los $1, $2, $3, $4, $5, $6
//         await queryRunner.query(
//           `INSERT INTO colors (
//              id,
//              name,
//              hex_code,
//              creation_time,
//              creator_user_id,
//              is_deleted
//            )
//            VALUES ($1, $2, $3, $4, $5, $6)`,
//           [
//             colorDomain.id, // $1
//             colorDomain.name, // $2
//             colorDomain.hexCode, // $3
//             new Date(), // $4 (creation_time)
//             systemUserId, // $5 (creator_user_id)
//             false, // $6 (is_deleted)
//           ],
//         );

//         this.logger.debug(`✅ Color insertado: ${data.name}`);
//       }

//       await queryRunner.commitTransaction();
//       this.logger.log(`🏁 Seed de ColorModule terminado.`);
//     } catch (err) {
//       this.logger.error('❌ Error en el seed de colores:', err);
//       await queryRunner.rollbackTransaction();
//     } finally {
//       await queryRunner.release();
//     }
//   }
// }
