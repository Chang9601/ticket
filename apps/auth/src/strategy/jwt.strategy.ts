import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { TokenPayload, UserPayload } from '@app/common';

import { UserService } from '../user/user.service';
import { ServerConfig } from '../config/server-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.AccessToken;
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
