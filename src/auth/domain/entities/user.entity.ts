export class User {
  constructor(
    private _id: string,
    private _username: string,
    private _email: string,
    private _name: string,
    private _surname: string,
    private _password: string,
    private _profilePicture: string,
    private _hashedRt?: string | null,
  ) {}

  get id(): string {
    return this._id;
  }
  get username(): string {
    return this._username;
  }
  get email(): string {
    return this._email;
  }
  get name(): string {
    return this._name;
  }
  get surname(): string {
    return this._surname;
  }
  get password(): string {
    return this._password;
  }
  get profilePicture(): string {
    return this._profilePicture;
  }
  get hashedRt(): string | null | undefined {
    return this._hashedRt;
  }

  public updateRefreshToken(hash: string | null): void {
    this._hashedRt = hash;
  }
}
