import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenPayload, UserPayload } from '@app/common';

import { ServerConfig } from './config/server-config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtSerivce: JwtService) {}

  public async signIn(user: UserPayload): Promise<string> {
    const payload: TokenPayload = { id: user.id };
    const token = await this.jwtSerivce.signAsync(payload, {
      secret: ServerConfig.ACCESS_TOKEN_SECRET,
      expiresIn: ServerConfig.ACCESS_TOKEN_EXPIRATION,
    });

    /*
      HttpOnly 속성은 JavaScript의 Document.cookie API로 쿠키에 접근할 수 없다. 즉, 쿠키는 서버로만 전송된다. XSS 공격(웹 사이트에 악성 스크립트를 실행하는 공격.)을 완화한다.
      Path 속성은 요청된 URL에 쿠키 헤더를 보낼 때 존재해야 하는 URL 경로를 나타낸다.
      SameSite 속성은 서버가 쿠키가 교차 사이트 요청과 함께 전송되는 방법 및 시점을 지정할 수 있다(사이트는 등록 가능한 도메인과 HTTP 또는 HTTPS와 같은 프로토콜에 의해 정의된다). 이는 교차 사이트 요청 위조 공격(CSRF, 신뢰할 수 있는 사용자를 흉내내고 웹 사이트에 요청을 위조해서 원치 않는 명령을 보내는 공격)을 완화한다.
      Max-Age 속성은 쿠키가 만료되는 시간을 초 단위로 나타낸다.
    */
    const cookie = `AccessToken=${token}; HttpOnly; Max-Age=${ServerConfig.ACCESS_TOKEN_EXPIRATION}; SameSite=Strict; Path=/;`;

    return cookie;
  }
}
