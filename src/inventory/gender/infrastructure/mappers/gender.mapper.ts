import { GenderResponseDto } from '../../application/dtos/gender-response.dto';
import { Gender } from '../../domain/entities/gender.entity';
import { GenderEntity } from '../models/gender.model';

export class GenderMapper {
  // De la Base de Datos -> Al Dominio
  static toDomain(entity: GenderEntity): Gender {
    const domainGender = Gender.hydrate(
      entity.id,
      entity.name,
      entity.shortName,
    );
    domainGender.creationTime = entity.creationTime;
    domainGender.creatorUserId = entity.creatorUserId;
    domainGender.lastModificationTime = entity.lastModificationTime;
    domainGender.lastModifierUserId = entity.lastModifierUserId;
    domainGender.isDeleted = entity.isDeleted;
    domainGender.deleterUserId = entity.deleterUserId;
    domainGender.deletionTime = entity.deletionTime;

    return domainGender;
  }

  // Del Dominio -> A la Base de Datos (TypeORM)
  static toModel(domain: Gender): GenderEntity {
    const entity = new GenderEntity();

    entity.id = domain.id;
    entity.name = domain.name;
    entity.shortName = domain.shortName;
    entity.creationTime = domain.creationTime;
    entity.creatorUserId = domain.creatorUserId;
    entity.lastModificationTime = domain.lastModificationTime;
    entity.lastModifierUserId = domain.lastModifierUserId;
    entity.isDeleted = domain.isDeleted;
    entity.deleterUserId = domain.deleterUserId;
    entity.deletionTime = domain.deletionTime;

    return entity;
  }

  static toResponse(entity: GenderEntity): GenderResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      shortName: entity.shortName,
    };
  }
}
