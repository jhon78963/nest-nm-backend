import { SizeResponseDto } from '../../application/dtos';
import { Size } from '../../domain/entities';
import { SizeEntity } from '../models';

export class SizeMapper {
  // De la Base de Datos -> Al Dominio
  static toDomain(entity: SizeEntity): Size {
    const domainSize = Size.hydrate(entity.id, entity.name, entity.sizeTypeId);
    domainSize.creationTime = entity.creationTime;
    domainSize.creatorUserId = entity.creatorUserId;
    domainSize.lastModificationTime = entity.lastModificationTime;
    domainSize.lastModifierUserId = entity.lastModifierUserId;
    domainSize.isDeleted = entity.isDeleted;
    domainSize.deleterUserId = entity.deleterUserId;
    domainSize.deletionTime = entity.deletionTime;

    return domainSize;
  }

  // Del Dominio -> A la Base de Datos (TypeORM)
  static toModel(domain: Size): SizeEntity {
    const entity = new SizeEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.sizeTypeId = domain.sizeTypeId;
    entity.creationTime = domain.creationTime;
    entity.creatorUserId = domain.creatorUserId;
    entity.lastModificationTime = domain.lastModificationTime;
    entity.lastModifierUserId = domain.lastModifierUserId;
    entity.isDeleted = domain.isDeleted;
    entity.deleterUserId = domain.deleterUserId;
    entity.deletionTime = domain.deletionTime;

    return entity;
  }

  static toResponse(entity: SizeEntity): SizeResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      sizeTypeId: entity.sizeTypeId,
    };
  }
}
