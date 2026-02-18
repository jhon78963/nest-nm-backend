import { SizeTypeResponseDto } from '../../application/dtos';
import { SizeType } from '../../domain/entities';
import { SizeTypeEntity } from '../models';

export class SizeTypeMapper {
  // De la Base de Datos -> Al Dominio
  static toDomain(entity: SizeTypeEntity): SizeType {
    const domainSizeType = SizeType.hydrate(entity.id, entity.name);
    domainSizeType.creationTime = entity.creationTime;
    domainSizeType.creatorUserId = entity.creatorUserId;
    domainSizeType.lastModificationTime = entity.lastModificationTime;
    domainSizeType.lastModifierUserId = entity.lastModifierUserId;
    domainSizeType.isDeleted = entity.isDeleted;
    domainSizeType.deleterUserId = entity.deleterUserId;
    domainSizeType.deletionTime = entity.deletionTime;

    return domainSizeType;
  }

  // Del Dominio -> A la Base de Datos (TypeORM)
  static toModel(domain: SizeType): SizeTypeEntity {
    const entity = new SizeTypeEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.creationTime = domain.creationTime;
    entity.creatorUserId = domain.creatorUserId;
    entity.lastModificationTime = domain.lastModificationTime;
    entity.lastModifierUserId = domain.lastModifierUserId;
    entity.isDeleted = domain.isDeleted;
    entity.deleterUserId = domain.deleterUserId;
    entity.deletionTime = domain.deletionTime;

    return entity;
  }

  static toResponse(entity: SizeTypeEntity): SizeTypeResponseDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
}
