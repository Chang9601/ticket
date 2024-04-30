import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  // TODO: 매퍼 사용 시 아이디로 오류가 발생하는데 요청 DTO는 아이디가 필요하지 않다.
  @IsOptional()
  public id: number;

  @IsEmail()
  public email: string;

  @IsStrongPassword()
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
