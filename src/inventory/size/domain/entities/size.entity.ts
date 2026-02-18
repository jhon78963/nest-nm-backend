import { AuditableDomain } from 'src/shared/domain/entities/auditable.entity';
import { v7 as uuidv7 } from 'uuid';

export class Size extends AuditableDomain {
  id: string;
  name: string;
  sizeTypeId: string;

  private constructor(id: string, name: string, sizeTypeId: string) {
    super();
    this.id = id;
    this.name = name;
    this.sizeTypeId = sizeTypeId;
  }

  static create(name: string, sizeTypeId: string, userId: string): Size {
    const id = uuidv7();
    const size = new Size(id, name, sizeTypeId);
    size.markAsCreated(userId);
    return size;
  }

  static hydrate(id: string, name: string, sizeTypeId: string): Size {
    return new Size(id, name, sizeTypeId);
  }

  update(name: string, sizeTypeId: string, userId: string): void {
    this.name = name;
    this.sizeTypeId = sizeTypeId;
    this.markAsUpdated(userId);
  }

  delete(userId: string): void {
    this.markAsDeleted(userId);
  }
}
