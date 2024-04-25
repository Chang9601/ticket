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

    수신된 JWT 토큰이 올바른지 확인하고 해당하는 사용자를 반환한다. 
    이 논리는 이미 JWT 전략에서 설정되어 있다(현재 요청 객체에서 JWT를 추출한다.)
  */
  @UseGuards(JwtAuthGuard)
  @MessagePattern('auth')
  /* @Payload() 데코레이터는 메시지 패턴에 대한 현재 페이로드를 추출한다. 이 경우 JWT 전략이 받는 동일한 요청 객체이다. */
  public async authenticate(@Payload() payload: any): Promise<UserPayload> {
    const user: UserPayload = payload.user;

    return user;
  }
}
