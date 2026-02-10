import { AuditableDomain } from 'src/shared/domain/entities/auditable.entity';
import { v7 as uuidv7 } from 'uuid';

export class Gender extends AuditableDomain {
  name: string;
  shortName: string;

  private constructor(id: string, name: string, shortName: string) {
    super();
    this.id = id;
    this.name = name;
    this.shortName = shortName;
  }

  static create(name: string, shortName: string, userId: string): Gender {
    const id = uuidv7();
    const gender = new Gender(id, name, shortName);
    gender.markAsCreated(userId);

    return gender;
  }

  static hydrate(id: string, name: string, shortName: string): Gender {
    return new Gender(id, name, shortName);
  }

  update(name: string, shortName: string, userId: string): void {
    this.name = name;
    this.shortName = shortName;
    this.markAsUpdated(userId);
  }

  delete(userId: string): void {
    this.markAsDeleted(userId);
  }
}
