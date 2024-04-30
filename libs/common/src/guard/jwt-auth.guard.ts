import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map, tap } from 'rxjs';

import { AUTH_SERVICE } from '../constant/service';
import { UserPayload } from '../type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  /*
   * ClientProxy 클래스를 사용하여 선택한 전송 계층에서 마이크로서비스와 메시지를 교환하거나 이벤트를 게시할 수 있다.
   * 요청-응답 메시지를 위한 send() 메서드, 이벤트 기반 메시지를 위한 emit() 메서드와 같은 여러 메서드를 정의하여 원격 마이크로서비스와 통신할 수 있다.
   * ClientsModule 클래스를 가져와서 정적 register() 메서드를 노출하여 ClientProxy 클래스의 인스턴스를 얻을 수 있다.
   * register() 메서드는 마이크로서비스 트랜스포터를 나타내는 객체 배열을 인자로 받는다. 각 객체는 name 속성, 선택적 transport 속성 (기본값은 Transport.TCP), 선택적으로 트랜스포트별 options 속성을 가진다.
   * name 속성은 필요한 곳에 ClientProxy의 인스턴스를 주입하는 데 사용할 수 있는 주입 토큰으로 작동한다. 주입 토큰으로서의 name 속성의 값은 임의의 문자열 또는 기호일 수 있다.
   * 옵션 속성은 이전에 createMicroservice() 메서드와 동일한 속성을 가진 객체이다.
   */
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    /* cookie-parser 라이브러리가 cookies 객체에 쿠키를 생성하고 채운다. */
    const cookies = request.cookies;
    const accessToken = cookies?.AccessToken;

    /* JWT 토큰이 존재하지 않으므로 요청을 더 이상 진행하지 않는다. */
    if (!accessToken) {
      return false;
    }

    /*
     * send() 메서드는 마이크로서비스를 호출하고 응답을 Observable로 반환한다.
     * 두 개의 인자 pattern과 payload를 사용한다.
     * pattern은 @MessagePattern() 데코레이터의 패턴과 일치해야 한다.
     * payload는 원격 마이크로서비스로 전송하려는 메시지이다.
     * 메서드는 Cold Observable을 반환하며 이는 메시지가 전송되기 전에 명시적으로 구독해야 함을 의미한다.
     *
     * Observable은 반응형 프로그래밍에서 기본적인 개념으로 시간에 따라 관찰될 수 있는 일련의 값을 나타낸다.
     * Observables는 HTTP 요청을 만들거나 이벤트를 청취하거나 데이터 스트림을 처리하는 등의 비동기 작업을 처리하는 데 흔히 사용된다.
     *
     * Cold vs. Hot
     * Cold Observable은 누군가 구독할 때만 값을 생성하기 시작한다.
     * Cold Observable의 각 구독은 Observable 시퀀스의 별도 실행을 생성한다.
     * 여러 구독자가 Cold Observable을 구독하는 경우, 각각 독립적으로 전체 값 시퀀스를 수신한다.
     * Cold Observable의 예로는 HTTP 요청이나 파일에서 읽기 등이 있다.
     *
     * Hot Observable은 구독 여부에 관계없이 값을 생성하기 시작한다.
     * Hot Observable에 대한 구독자는 구독 시점부터 값을 수신하기 시작하며 이전 값을 놓칠 수 있다.
     * Hot Observable은 여러 구독자 간에 데이터 스트림을 공유하기 위해 일반적으로 사용된다.
     * Hot Observable의 예로는 마우스 클릭, 키 누름 또는 WebSocket 메시지 등이 있다.
     */
    return (
      this.authService
        .send<UserPayload>('auth', {
          AccessToken: accessToken,
        })
        /* Observable에 추가 연산자를 파이핑한다. */
        .pipe(
          /*
           * tap 연산자는 수신된 응답에 부수 효과(side-effect)를 실행할 수 있게 해준다.
           * 인증 서비스로부터 수신된 응답은 JWT 토큰과 연관된 사용자이다.
           */
          tap((res) => {
            context.switchToHttp().getRequest().user = res;
          }),
          /* 인증 서비스로부터 성공한 응답(즉, 인증 성공)이 돌아오면 canActivate에서 true를 반환하여 요청이 진행되고 인증되었는지 확인한다. */
          map(() => true),
        )
    );
  }
}
