import { Test, TestingModule } from '@nestjs/testing';

import { Password } from '@app/common';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { DuplicateUserException } from './exception/duplicate-user.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { InvalidCredentialException } from '../exception/invalid-credential.exception';

const id = 1;
const email = 'abc@naver.com';
const password = '1234';
const createUserDto = new CreateUserDto(email, password);
const userEntity = new UserEntity({ ...createUserDto, id });

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockReturnValue(userEntity),
            exist: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('userService는 정의되어야 한다.', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('사용자를 생성하는데 성공한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      const userDto = await userService.create(createUserDto);

      expect(userDto).toBeDefined();
      expect(userDto.email).toBe(userEntity.email);
    });

    it('이미 사용 중인 이메일로 회원가입을 시도하기 때문에 사용자를 생성하는데 실패한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(true);

      await expect(userService.create(createUserDto)).rejects.toThrow(
        DuplicateUserException,
      );
    });
  });

  describe('findOne', () => {
    it('아이디로 사용자를 검색하는데 성공한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(true);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);

      const userPayload = await userService.findOne(id);

      expect(userPayload).toBeDefined();
      expect(userPayload.email).toBe(userEntity.email);
    });

    it('아이디가 유효하지 않아 사용자를 검색하는데 실패한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      await expect(userService.findOne(id)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('validate', () => {
    it('이메일과 비밀번호로 사용자를 검증하며 성공한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(true);
      jest.spyOn(userRepository, 'findOne').mockImplementationOnce(async () =>
        Promise.resolve({
          ...userEntity,
          password: await Password.hash(userEntity.password),
        }),
      );

      const userPayload = await userService.validate(email, password);

      expect(userPayload).toBeDefined();
      expect(userPayload.email).toBe(userEntity.email);
    });

    it('이메일이 유효하지 않아 사용자 검증에 실패한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);

      await expect(userService.validate(email, password)).rejects.toThrow(
        InvalidCredentialException,
      );
    });

    it('비밀번호가 유효하지 않아 사용자 검증에 실패한다.', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(true);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);

      await expect(userService.validate(email, password)).rejects.toThrow(
        InvalidCredentialException,
      );
    });
  });
});
