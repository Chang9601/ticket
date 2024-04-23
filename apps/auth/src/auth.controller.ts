import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';

import { ApiResponse, AuthUser, Code, UserPayload } from '@app/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async signIn(
    @AuthUser() user: UserPayload,
    @Res() response: Response,
  ): Promise<void> {
    const cookie = await this.authService.signIn(user);

    response
      .setHeader('Set-Cookie', cookie)
      .send(ApiResponse.handleSuccess(Code.OK.code, Code.OK.message, user));
  }

  /*
    요청-응답 패러다임을 기반으로 한 메시지 핸들러를 생성하려면 @MessagePattern() 데코레이터를 사용한다. 
    선택한 전송 계층에서 수신되는 RPC 호출을 허용한다. HTTP 호출과 매우 유사하다.
    이 데코레이터는 애플리케이션의 진입점인 컨트롤러 클래스 내에서만 사용해야 한다. 프로바이더 내부에서 사용하는 것은 Nest 런타임에 의해 무시되므로 아무 효과도 없다.
    메시지 핸들러는 동기적으로 또는 비동기적으로 응답할 수 있다. 따라서 비동기 메서드가 지원된다.
  */
  @UseGuards(JwtAuthGuard)
  @MessagePattern('auth')
  public async authenticate(@Payload() payload: any): Promise<UserPayload> {
    const user: UserPayload = payload.user;

    return user;
  }
}
