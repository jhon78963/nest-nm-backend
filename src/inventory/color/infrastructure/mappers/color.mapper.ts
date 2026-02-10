import { ColorResponseDto } from '../../application/dtos/color-response.dto';
import { Color } from '../../domain/entities/color.entity';
import { ColorEntity } from '../models/color.model';

export class ColorMapper {
  // De la Base de Datos -> Al Dominio
  static toDomain(entity: ColorEntity): Color {
    const domainColor = Color.hydrate(entity.id, entity.name, entity.hexCode);
    domainColor.creationTime = entity.creationTime;
    domainColor.creatorUserId = entity.creatorUserId;
    domainColor.lastModificationTime = entity.lastModificationTime;
    domainColor.lastModifierUserId = entity.lastModifierUserId;
    domainColor.isDeleted = entity.isDeleted;
    domainColor.deleterUserId = entity.deleterUserId;
    domainColor.deletionTime = entity.deletionTime;

    return domainColor;
  }

  // Del Dominio -> A la Base de Datos (TypeORM)
  static toModel(domain: Color): ColorEntity {
    const entity = new ColorEntity();

    entity.id = domain.id;
    entity.name = domain.name;
    entity.hexCode = domain.hexCode;
    entity.creationTime = domain.creationTime;
    entity.creatorUserId = domain.creatorUserId;
    entity.lastModificationTime = domain.lastModificationTime;
    entity.lastModifierUserId = domain.lastModifierUserId;
    entity.isDeleted = domain.isDeleted;
    entity.deleterUserId = domain.deleterUserId;
    entity.deletionTime = domain.deletionTime;

    return entity;
  }

  static toResponse(entity: ColorEntity): ColorResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      hexCode: entity.hexCode,
    };
  }
}
