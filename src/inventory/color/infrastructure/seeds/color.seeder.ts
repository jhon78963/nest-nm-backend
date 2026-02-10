import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Color } from '../../domain/entities/color.entity';

@Injectable()
export class ColorSeeder {
  private readonly logger = new Logger(ColorSeeder.name);

  constructor(private readonly dataSource: DataSource) {}

  async run() {
    this.logger.log('🎨 Iniciando seed de ColorModule...');

    const colorsToSeed = [
      { name: 'Negro', hexCode: '#000000' },
      { name: 'Blanco', hexCode: '#ffffff' },
      { name: 'Beige', hexCode: '#eaddca' },
      { name: 'Hueso', hexCode: '#d3d3d3' },
      { name: 'Camel', hexCode: '#9e6f40' },
      { name: 'Verde Petroleo', hexCode: '#404d44' },
      { name: 'Celeste', hexCode: '#a3c1d1' },
      { name: 'Grafito', hexCode: '#3a3f44' },
      { name: 'Plomo', hexCode: '#696969' },
      { name: 'Azul Cristal', hexCode: '#8fb6d3' },
      { name: 'Lacre', hexCode: '#8e312e' },
      { name: 'Guinda', hexCode: '#680829' },
      { name: 'Plomo Oscuro', hexCode: '#b0b0b0' },
      { name: 'Plomo Claro', hexCode: '#d3d3d3' },
      { name: 'Verde', hexCode: '#008000' },
      { name: 'Marrón', hexCode: '#964b00' },
      { name: 'Azulino', hexCode: '#4169e1' },
      { name: 'Rojo', hexCode: '#ff0000' },
      { name: 'Acero', hexCode: '#4682b4' },
      { name: 'Hielo', hexCode: '#f2f3f5' },
      { name: 'Crema', hexCode: '#fffdd0' },
      { name: 'Lila', hexCode: '#c8a2c8' },
      { name: 'Palo Rosa', hexCode: '#e3aaaa' },
      { name: 'Melon', hexCode: '#fdbcb4' },
      { name: 'Amarillo', hexCode: '#ffff00' },
      { name: 'Fucsia', hexCode: '#ff00ff' },
      { name: 'Rosado', hexCode: '#ffc0cb' },
      { name: 'Vino', hexCode: '#722f37' },
      { name: 'Fresa', hexCode: '#d53032' },
      { name: 'Azul', hexCode: '#0000ff' },
      { name: 'Mostaza', hexCode: '#ffdb58' },
      { name: 'Coral', hexCode: '#ff7f50' },
      { name: 'Azul Marino', hexCode: '#000080' },
      { name: 'Verde Agua', hexCode: '#7fffd4' },
      { name: 'Turqueza', hexCode: '#40e0d0' },
      { name: 'Verde Jade', hexCode: '#00a86b' },
      { name: 'Morado', hexCode: '#800080' },
      { name: 'Uva', hexCode: '#6f2da8' },
      { name: 'Azul Noche', hexCode: '#003366' },
      { name: 'Azul Grafito', hexCode: '#28333e' },
      { name: 'Azul Petróleo', hexCode: '#2c4c54' },
      { name: 'Nevado', hexCode: '#d3d3d3' },
      { name: 'Verdoso', hexCode: '#708238' },
      { name: 'Maiz', hexCode: '#fbec5d' },
      { name: 'Madera', hexCode: '#966f33' },
      { name: 'Verde Cemento', hexCode: '#708672' },
      { name: 'Lapiz', hexCode: '#898989' },
      { name: 'Papel', hexCode: '#faf9f6' },
      { name: 'Verde Limon', hexCode: '#32cd32' },
      { name: 'Verde Loro', hexCode: '#44d62c' },
      { name: 'Verde Agua Marina', hexCode: '#7fffd4' },
      { name: 'Cemento', hexCode: '#a5a391' },
      { name: 'Charcoal', hexCode: '#36454f' },
      { name: 'Verde Caña', hexCode: '#6c7156' },
      { name: 'Nugget', hexCode: '#dbb04a' },
      { name: 'Verde Botella', hexCode: '#34623e' },
      { name: 'Cocoa', hexCode: '#875f42' },
      { name: 'Violeta', hexCode: '#7f00ff' },
      { name: 'Verde Militar', hexCode: '#4d5421' },
      { name: 'Naranja', hexCode: '#ff8000' },
    ];

    const systemUserId = '41f4f942-f432-4876-b627-a77d45cf2594';

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const data of colorsToSeed) {
        // Usamos tu dominio para generar el ID (y validaciones si las tuviera)
        const colorDomain = Color.create(data.name, data.hexCode, systemUserId);

        // 1. Verificar existencia ($1)
        const existing = await queryRunner.query(
          `SELECT id FROM colors WHERE name = $1 LIMIT 1`,
          [data.name],
        );

        if (existing.length > 0) {
          continue;
        }

        // 2. Insertar con nombres de columnas de AuditableEntity
        // OJO: Postgres cuenta los $1, $2, $3, $4, $5, $6
        await queryRunner.query(
          `INSERT INTO colors (
             id, 
             name, 
             hex_code, 
             creation_time, 
             creator_user_id, 
             is_deleted
           ) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            colorDomain.id, // $1
            colorDomain.name, // $2
            colorDomain.hexCode, // $3
            new Date(), // $4 (creation_time)
            systemUserId, // $5 (creator_user_id)
            false, // $6 (is_deleted)
          ],
        );

        this.logger.debug(`✅ Color insertado: ${data.name}`);
      }

      await queryRunner.commitTransaction();
      this.logger.log(`🏁 Seed de ColorModule terminado.`);
    } catch (err) {
      this.logger.error('❌ Error en el seed de colores:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
