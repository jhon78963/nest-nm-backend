import { Color } from '../../domain/entities/color.entity';
import { ColorEntity } from '../models/color.model';

export class ColorMapper {
  static toDomain(entity: ColorEntity): Color {
    return new Color(entity.id, entity.name, entity.hexCode);
  }

  static toModel(color: Partial<Color>): Partial<ColorEntity> {
    const entity = new ColorEntity();

    if (color.id) entity.id = color.id;
    if (color.name) entity.name = color.name;
    if (color.hexCode) entity.hexCode = color.hexCode;

    return entity;
  }
}
