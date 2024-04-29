export class UserDto {
  public id: number;

  public email: string;

  public password: string;

  constructor(id?: number, email?: string, password?: string) {
    this.id = id || -1;
    this.email = email || '';
    this.password = password || '';
  }
}
