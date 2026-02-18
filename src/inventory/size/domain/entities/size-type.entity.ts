import { AuditableDomain } from 'src/shared/domain/entities/auditable.entity';
import { v7 as uuidv7 } from 'uuid';

export class SizeType extends AuditableDomain {
  name: string;

  private constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  static create(name: string, userId: string): SizeType {
    const id = uuidv7();
    const sizeType = new SizeType(id, name);
    sizeType.markAsCreated(userId);

    return sizeType;
  }

  static hydrate(id: string, name: string): SizeType {
    return new SizeType(id, name);
  }

  update(name: string, userId: string): void {
    this.name = name;
    this.markAsUpdated(userId);
  }

  delete(userId: string): void {
    this.markAsDeleted(userId);
  }
}
