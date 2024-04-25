import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload, UserPayload } from '@app/common';

import { UserService } from '../user/user.service';
import { ServerConfig } from '../config/server-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          /* JWT 토큰이 RPC 호출에서 오는 경우 cookies 객체 내에 있지 않으며 request 객체에 있다. */
          return request?.cookies?.AccessToken || request?.AccessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: ServerConfig.ACCESS_TOKEN_SECRET,
    });
  }

  public async validate(token: TokenPayload): Promise<UserPayload> {
    const { id } = token;

    const userPayload = await this.userService.findOne(id);

    return userPayload;
  }
}
