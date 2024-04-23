import { Injectable } from '@nestjs/common';

import { Password } from '@app/common';
import { UserPayload } from '@app/common/type/auth-type';

import { UserMapper } from './mapper/user-mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { DuplicateUserException } from './exception/duplicate-user.exception';
import { InvalidCredentialException } from '../exception/invalid-credential.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userEntity = UserMapper.toEntity(createUserDto);
    const { email, password } = userEntity;

    const userEntityExists = await this.userRepository.exist({ email });

    if (userEntityExists) {
      throw new DuplicateUserException('이미 사용 중인 이메일입니다');
    }

    const savedUserEntity = await this.userRepository.create({
      ...userEntity,
      password: await Password.hash(password),
    });

    return UserMapper.toDto(savedUserEntity);
  }

  public async findOne(id: number): Promise<UserPayload> {
    const userEntityExists = await this.userRepository.exist({
      id,
    });

    if (!userEntityExists) {
      throw new UserNotFoundException('사용자가 존재하지 않습니다');
    }

    const userEntity = await this.userRepository.findOne({ id });

    const userPayload: UserPayload = {
      id: userEntity.id,
      email: userEntity.email,
    };

    return userPayload;
  }

  public async validate(email: string, password: string): Promise<UserPayload> {
    const userEntityExists = await this.userRepository.exist({ email });

    if (!userEntityExists) {
      throw new InvalidCredentialException(
        '이메일 혹은 비밀번호가 유효하지 않습니다',
      );
    }

    const userEntity = await this.userRepository.findOne({ email });
    const passwordMatch = await Password.compare(password, userEntity.password);

    if (!passwordMatch) {
      throw new InvalidCredentialException(
        '이메일 혹은 비밀번호가 유효하지 않습니다',
      );
    }

    const userPayload: UserPayload = {
      id: userEntity.id,
      email: userEntity.email,
    };

    return userPayload;
  }
}
