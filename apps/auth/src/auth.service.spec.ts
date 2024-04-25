import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UserPayload } from '@app/common';

import { AuthService } from './auth.service';

const user: UserPayload = { id: 1, email: 'abc@naver.com' };
const token = 'sfabe231wsfvzvfWE!@EDSf';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(token),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('authService는 정의되어야 한다.', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('로그인에 성공한다.', async () => {
      const cookie = await authService.signIn(user);

      expect(cookie).toBeDefined();
    });
  });
});
