import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { ApiResponse, Code, UserPayload } from '@app/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthUser } from './decorator/auth-user.decorator';

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
}
