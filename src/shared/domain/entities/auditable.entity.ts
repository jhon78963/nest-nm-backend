export abstract class AuditableDomain {
  id: string;
  creationTime: Date;
  creatorUserId: string | null;
  lastModificationTime: Date;
  lastModifierUserId: string | null;
  isDeleted: boolean;
  deleterUserId: string | null;
  deletionTime: Date;

  public markAsCreated(userId: string): void {
    this.creationTime = new Date();
    this.creatorUserId = userId;
    this.isDeleted = false;
  }

  public markAsUpdated(userId: string): void {
    this.lastModificationTime = new Date();
    this.lastModifierUserId = userId;
  }

  public markAsDeleted(userId: string): void {
    this.isDeleted = true;
    this.deletionTime = new Date();
    this.deleterUserId = userId;
  }
}
