import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { UserPayload } from '@app/common';

import { UserService } from '../user/user.service';

/*
  Passport 전략 구성 요소.
  1. 전략 선택 사항들의 집합(e.g., JWT 전략의 경우 토큰을 서명하기 위한 비밀.).
  2. 검증 콜백은 Passport에게 사용자 저장소(사용자 계정을 관리하는 곳)와 상호 작용하는 방법을 알려준다.
     다시 말해 사용자의 존재 여부와 자격 증명이 유효한지 확인한다.
     Passport 라이브러리는 콜백 함수가 유효성 검사가 성공하면 완전한 사용자를 반환하거나 실패하면 null을 반환할 것으로 예상한다.
*/
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // 전략 선택 사항을 전달하기 위해서는 하위 클래스에서 super() 메서드를 호출하여 선택 사항 객체를 전달한다.
  constructor(private userService: UserService) {
    // passport-local 전략은 기본적으로 요청 본문에 username과 password라는 속성을 기대하지만 다른 속성 이름을 지정하려면 선택 사항 객체를 전달한다.
    super({ usernameField: 'email' });
  }

  /*
    각 전략에 대해 Passport는 적절한 전략별 매개변수 집합을 사용하여 검증 함수를 호출한다(검증 함수는 @nestjs/passport의 validate() 메서드를 사용하여 구현된다.).
    검증 콜백을 제공하기 위해서 하위 클래스에서 validate() 메서드를 구현한다.
    모든 Passport 전략의 validate() 메서드는 자격 증명이 어떻게 표현되는지의 세부 사항만 다를 뿐 유사한 패턴을 따른다.
    사용자를 찾고 자격 증명이 유효한 경우 Passport가 작업을 완료할 수 있도록(e.g., Request 객체에 user 속성을 생성한다.) 사용자가 반환되고 요청 처리 파이프라인이 진행된다.
    사용자를 찾지 못한 경우 예외를 던지고 예외 처리 계층이 처리한다.
    일반적으로 각 전략의 validate() 메서드에서 유일한 중요한 차이점은 사용자가 존재하고 유효한지를 결정하는 방법이다.
  */
  public async validate(email: string, password: string): Promise<UserPayload> {
    return await this.userService.validate(email, password);
  }
}
