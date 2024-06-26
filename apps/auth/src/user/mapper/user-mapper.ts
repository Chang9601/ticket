import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  public static toEntity(userDto: UserDto): UserEntity {
    return new UserEntity({ ...userDto });
  }

  public static toDto(userEntity: UserEntity): UserDto {
    return new UserDto(userEntity.email);
  }
}
