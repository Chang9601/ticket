import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiResponse, UserPayload, Code } from '@app/common';

import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from '../decorator/auth-user.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserDto>> {
    const userDto = await this.userService.create(createUserDto);

    return ApiResponse.handleSuccess(
      Code.CREATED.code,
      Code.CREATED.message,
      userDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public getUser(@AuthUser() user: UserPayload): ApiResponse<UserPayload> {
    return ApiResponse.handleSuccess(Code.OK.code, Code.OK.message, user);
  }
}
