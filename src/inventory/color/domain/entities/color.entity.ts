import { AuditableDomain } from 'src/shared/domain/entities/auditable.entity';
import { v7 as uuidv7 } from 'uuid';

export class Color extends AuditableDomain {
  name: string;
  hexCode: string;

  private constructor(id: string, name: string, hexCode: string) {
    super();
    this.id = id;
    this.name = name;
    this.hexCode = hexCode;
  }

  static create(name: string, hexCode: string, userId: string): Color {
    const id = uuidv7();
    const color = new Color(id, name, hexCode);
    color.markAsCreated(userId);

    return color;
  }

  static hydrate(id: string, name: string, hexCode: string): Color {
    return new Color(id, name, hexCode);
  }

  update(name: string, hexCode: string, userId: string): void {
    this.name = name;
    this.hexCode = hexCode;
    this.markAsUpdated(userId);
  }

  delete(userId: string): void {
    this.markAsDeleted(userId);
  }
}
