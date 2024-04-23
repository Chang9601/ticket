import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsStrongPassword()
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
